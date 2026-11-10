
import { BookOpen, Award, CheckCircle2, ArrowRight, Clock, Sparkles } from 'lucide-react';

export default function StudentDashboard({ student, courses, onSelectCourse, setActiveTab }) {
  const enrolledCoursesList = courses.filter(c => student.enrolledCourses.includes(c.id));
  
  let totalLessonsAcrossEnrolled = 0;
  let completedLessonsCount = 0;

  enrolledCoursesList.forEach(course => {
    const total = course.lessons.length;
    totalLessonsAcrossEnrolled += total;
    const completed = (student.completedLessons[course.id] || []).length;
    completedLessonsCount += completed;
  });

  const overallProgress = totalLessonsAcrossEnrolled > 0 
    ? Math.round((completedLessonsCount / totalLessonsAcrossEnrolled) * 100) 
    : 0;

  const completedCoursesCount = enrolledCoursesList.filter(course => {
    const completed = (student.completedLessons[course.id] || []).length;
    return completed === course.lessons.length && course.lessons.length > 0;
  }).length;

  const certificatesCount = Object.keys(student.quizScores || {}).filter(
    id => student.quizScores[id]?.passed
  ).length;

  return (
    <div className="space-y-8 sm:space-y-10 animate-fade-in">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-950/90 to-lime-950/80 text-stone-100 rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden shadow-xl">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Welcome back, {student.name.split(' ')[0]}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight leading-snug">
            Ready to elevate your engineering mastery today?
          </h1>
          <p className="text-stone-300 text-xs sm:text-sm lg:text-base leading-relaxed">
            You are making exceptional progress across your enrolled curriculum. Continue your active modules or explore new tracks in the catalogue.
          </p>
          <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
            <button 
              onClick={() => setActiveTab('my-courses')}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl shadow-lg transition-all flex items-center gap-2 group text-xs sm:text-sm"
            >
              Resume Learning <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setActiveTab('catalogue')}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/15 text-xs sm:text-sm"
            >
              Browse Catalogue
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-green-200/80 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shrink-0">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-stone-700">Enrolled Courses</p>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{enrolledCoursesList.length}</h3>
          </div>
        </div>

        <div className="bg-amber-200/80 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold shrink-0">
            <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-stone-700">Overall Progress</p>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{overallProgress}%</h3>
          </div>
        </div>

        <div className="bg-blue-200/80 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-stone-700">Completed Courses</p>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{completedCoursesCount}</h3>
          </div>
        </div>

        <div className="bg-violet-200/80 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold shrink-0">
            <Award className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-medium text-stone-700">Certificates Earned</p>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900">{certificatesCount}</h3>
          </div>
        </div>
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900">Active Enrolled Courses</h2>
          <button 
            onClick={() => setActiveTab('my-courses')}
            className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
          >
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {enrolledCoursesList.length === 0 ? (
          <div className="bg-lime-100 rounded-2xl border border-stone-200 p-10 sm:p-12 text-center space-y-4">
            <p className="text-stone-500 text-sm">You are not enrolled in any courses yet.</p>
            <button 
              onClick={() => setActiveTab('catalogue')}
              className="px-5 py-2.5 bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-emerald-800 transition-all"
            >
              Explore Course Catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCoursesList.map(course => {
              const completed = (student.completedLessons[course.id] || []).length;
              const total = course.lessons.length;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

              return (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="bg-lime-200/60 rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 sm:h-48 overflow-hidden bg-stone-100">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-stone-900 text-xs font-semibold">
                        {course.category}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6 space-y-3">
                      <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg group-hover:text-emerald-800 transition-colors line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">Instructor: {course.instructor}</p>
                      
                      {/* Progress Bar */}
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

    </div>
  );
}