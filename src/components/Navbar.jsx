import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Compass, 
  User, 
  ShieldCheck, 
  GraduationCap, 
  Search,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, searchQuery, setSearchQuery }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'catalogue', label: 'Catalogue', icon: Compass },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  return (
    <header className="sticky top-0 z-50 bg-lime-200/50 mx-5  mt-2 rounded-full backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div 
          onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full text-emerald-50 flex items-center justify-center font-bold text-lg sm:text-xl shadow-md  transition-all">
            <img src="/public/logo.png" className='rounded-4xl bg-lime-300' alt="logo" />
          </div>
          <div>
            <span className="text-lg sm:text-xl font-bold tracking-tight text-stone-900 font-serif">SmartLMS</span>
            <span className="block text-[10px] sm:text-xs font-medium text-emerald-700 tracking-wider uppercase">Academy</span>
          </div>
        </div>

        {/* Global Search Bar (Desktop) */}
        {activeTab === 'catalogue' && (
          <div className="flex-1 max-w-sm relative hidden lg:block mx-4">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search courses, instructors, topics..."
              value={searchQuery || ''}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 border border-stone-200 rounded-full pl-10 pr-4 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
            />
          </div>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-stone-100 p-1.5 rounded-full border border-stone-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-3xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-lime-200 text-emerald-900 shadow-sm border border-stone-200/60 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-stone-500'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-2 animate-fade-in shadow-lg">
          {activeTab === 'catalogue' && (
            <div className="relative mb-3">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery || ''}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20"
              />
            </div>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-900 text-white font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}