import React, { useState } from 'react';
import { Star, Users, Filter } from 'lucide-react';

export default function CourseCatalogue({ courses, student, onEnroll, onSelectCourse, searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');

  const categories = ['All', 'Engineering', 'Design', 'Business'];

  const filtered = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.enrolledCount - a.enrolledCount;
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Course Catalogue</h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">Explore our expert-led curriculum and advance your technical expertise.</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-xl px-4 py-2 shadow-sm text-xs sm:text-sm w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-stone-900 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="rating">Top Rated</option>
              <option value="popular">Most Enrolled</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-emerald-900 text-white shadow-sm font-semibold'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <p className="text-stone-500 font-medium text-sm">No courses found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            className="text-xs font-semibold text-emerald-800 underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map(course => {
            const isEnrolled = student.enrolledCourses.includes(course.id);

            return (
              <div 
                key={course.id}
                className="hover:scale-102 bg-lime-100 p-3 rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-lime-500 hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-100 cursor-pointer rounded-2xl" onClick={() => onSelectCourse(course)}>
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105  transition-transform duration-500 " 
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold">
                      {course.category}
                    </span>
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-900 text-white text-xs font-bold">
                      {course.price}
                    </span>
                  </div>

                  <div className='border border-1 border-white mt-5'></div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                      <span className="bg-stone-100 px-2.5 py-1 rounded-md">{course.level}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-stone-800">{course.rating}</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onSelectCourse(course)}
                      className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-emerald-800 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {course.title}
                    </h3>

                    <p className="text-xs text-stone-800 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-1 flex items-center justify-between text-xs text-stone-800">
                      <span className="truncate pr-2">Instructor: <strong className="text-stone-800">{course.instructor}</strong></span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Users className="w-3.5 h-3.5" /> {course.enrolledCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pt-0">
                  {isEnrolled ? (
                    <button 
                      onClick={() => onSelectCourse(course)}
                      className="w-full py-2.5 sm:py-3 bg-green-600 text-stone-100 font-semibold rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-stone-200 transition-colors"
                    >
                      Enrolled &bull; View Lessons
                    </button>
                  ) : (
                    <button 
                      onClick={() => onEnroll(course.id)}
                      className="w-full py-2.5 sm:py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-sm transition-all"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}