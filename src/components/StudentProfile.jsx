import React, { useState } from 'react';
import { User, Mail, Award, CheckCircle2, Save, Sparkles } from 'lucide-react';

export default function StudentProfile({ student, onUpdateProfile, courses }) {
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [bio, setBio] = useState(student.bio);
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, email, bio });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  const certificates = Object.keys(student.quizScores || {}).filter(
    id => student.quizScores[id]?.passed
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Student Profile & Credentials</h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">Manage your personal account credentials and view verified certificates.</p>
      </div>

      {savedMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" /> Profile settings updated successfully!
        </div>
      )}

      {/* Profile Edit Card */}
      <div className="bg-lime-100 rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 pb-6 border-b border-stone-100 text-center sm:text-left">
          <img 
            src={student.avatar} 
            alt={student.name} 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-stone-200 shadow-sm shrink-0" 
          />
          <div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">{student.name}</h2>
            <p className="text-xs text-stone-500 font-medium">{student.role}</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3" /> Premium Enrollee
            </span>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">Professional Bio</label>
            <textarea 
              rows={3} 
              value={bio} 
              onChange={e => setBio(e.target.value)}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button 
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Verified Certificates Section */}
      <div className="bg-red-100 rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-bold shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">Verified Certificates</h3>
            <p className="text-xs text-stone-500">Official certificates earned upon successful course assessment completion.</p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="p-8 bg-stone-50 rounded-2xl border border-stone-200/60 text-center space-y-2">
            <p className="text-stone-500 text-xs sm:text-sm font-medium">No certificates earned yet.</p>
            <p className="text-stone-400 text-xs">Complete lessons and pass course quizzes to earn verifiable credentials.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(courseId => {
              const course = courses.find(c => c.id === Number(courseId));
              if (!course) return null;
              const res = student.quizScores[courseId];

              return (
                <div key={courseId} className="bg-stone-50 rounded-2xl p-5 border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-md">
                      Verified Certificate
                    </span>
                    <span className="text-xs font-bold text-stone-700">Score: {res.score}%</span>
                  </div>
                  <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">{course.title}</h4>
                  <p className="text-xs text-stone-500">Instructor: {course.instructor}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}