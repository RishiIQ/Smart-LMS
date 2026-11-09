import React from 'react';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function MyCourses({ student, courses, onSelectCourse, setActiveTab }) {
  const enrolledList = courses.filter(c => student.enrolledCourses.includes(c.id));

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">My Enrolled Courses</h1>
        <p className="text-stone-500 text-xs sm:text-sm mt-1">Manage your active learning curriculum and track your completion milestones.</p>
      </div>

      {enrolledList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 sm:p-16 text-center space-y-4">
          <div className="w-16 h-16 bg-stone-100 text-stone-400 rounded-2xl mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-stone-900">No active enrollee records</h3>
          <p className="text-stone-500 text-xs sm:text-sm max-w-md mx-auto">
            You haven't enrolled in any courses yet. Browse our professional catalogue to begin your learning journey.
          </p>
          <button 
            onClick={() => setActiveTab('catalogue')}
            className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-medium rounded-xl text-xs sm:text-sm transition-all shadow-sm"
          >
            Explore Catalogue
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledList.map(course => {
            const completed = (student.completedLessons[course.id] || []).length;
            const total = course.lessons.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            const isCompleted = pct === 100;

            return (
              <div 
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className="bg-lime-200/60 p-2 rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 sm:h-48 overflow-hidden rounded-xl bg-stone-100">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold">
                      {course.category}
                    </span>
                    {isCompleted && (
                      <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-900 text-white text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    )}
                  </div>

                  <div className="p-5 sm:p-6 space-y-3">
                    <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-emerald-800 transition-colors line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">Instructor: {course.instructor}</p>

                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold text-stone-700">
                        <span>Progress</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-700 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 pt-4 mt-2">
                  <span>{completed} of {total} lessons</span>
                  <span className="font-semibold text-emerald-800 group-hover:underline flex items-center gap-1">
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}