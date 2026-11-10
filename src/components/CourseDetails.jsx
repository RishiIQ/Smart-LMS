
import { Star, Users, ArrowLeft, CheckCircle2, PlayCircle, Award, HelpCircle } from 'lucide-react';

export default function CourseDetails({ course, student, onBack, onEnroll, onStartLesson, onStartQuiz }) {
  const isEnrolled = student.enrolledCourses.includes(course.id);
  const completedLessons = student.completedLessons[course.id] || [];
  const quizResult = student.quizScores[course.id];

  const totalLessons = course.lessons.length;
  const progressPct = totalLessons > 0 ? Math.round((completedLessons.length / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      {/* Hero Banner Card */}
      <div className="bg-lime-200/50 rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-semibold text-xs">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-semibold text-xs">
                  {course.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {course.title}
              </h1>

              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                {course.description}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-100 text-xs text-stone-500">
              <div>
                <span className="block text-stone-600 font-medium">Instructor</span>
                <strong className="text-stone-900 text-xs sm:text-sm">{course.instructor}</strong>
              </div>
              <div>
                <span className="block text-stone-600 font-medium">Rating</span>
                <div className="flex items-center gap-1 font-semibold text-stone-900 text-xs sm:text-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {course.rating}
                </div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="block text-stone-600 font-medium">Enrolled</span>
                <div className="flex items-center gap-1 font-semibold text-stone-900 text-xs sm:text-sm">
                  <Users className="w-4 h-4 text-stone-900" /> {course.enrolledCount} students
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative bg-stone-100 min-h-[220px] sm:min-h-[280px]">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-stone-900/10" />
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl text-stone-900 font-bold text-base sm:text-lg shadow-lg">
              {course.price}
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Action / Progress Section */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-sm">
        {isEnrolled ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
              <span className="text-stone-900">Your Course Progress</span>
              <span className="text-emerald-800">{progressPct}% Complete</span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-700 transition-all duration-500 rounded-full"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">Ready to start learning?</h3>
              <p className="text-xs text-stone-500">Enroll today to access full lessons, source materials, and quizzes.</p>
            </div>
            <button 
              onClick={() => onEnroll(course.id)}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all whitespace-nowrap"
            >
              Enroll for {course.price}
            </button>
          </div>
        )}
      </div>

      {/* Curriculum & Lessons List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">Curriculum & Lessons</h2>
          <span className="text-xs font-semibold text-stone-500 bg-stone-100 px-3 py-1.5 rounded-lg">
            {totalLessons} Modules
          </span>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson, idx) => {
            const isCompleted = completedLessons.includes(lesson.id);

            return (
              <div 
                key={lesson.id}
                className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:border-emerald-700/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">{lesson.title}</h4>
                    <p className="text-xs text-stone-500">{lesson.duration} &bull; Interactive Module</p>
                  </div>
                </div>

                {isEnrolled ? (
                  <button 
                    onClick={() => onStartLesson(course, lesson)}
                    className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shrink-0 ${
                      isCompleted 
                        ? 'bg-stone-100 text-stone-700 hover:bg-stone-200' 
                        : 'bg-emerald-900 text-white hover:bg-emerald-800'
                    }`}
                  >
                    <PlayCircle className="w-4 h-4" /> {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                  </button>
                ) : (
                  <span className="text-xs text-stone-400 font-medium bg-stone-50 px-3 py-1.5 rounded-lg text-center">
                    Locked
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz & Assessment Section */}
      {course.quiz && (
        <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-semibold">
                <HelpCircle className="w-3.5 h-3.5" /> Assessment Required
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold">{course.quiz.title}</h3>
              <p className="text-stone-300 text-xs sm:text-sm">
                Test your understanding of {course.title} and earn your verified certificate.
              </p>
              {quizResult && (
                <div className="pt-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold ${
                    quizResult.passed ? 'bg-emerald-900/80 text-emerald-300' : 'bg-rose-900/80 text-rose-300'
                  }`}>
                    {quizResult.passed ? <Award className="w-3.5 h-3.5" /> : null}
                    Last Score: {quizResult.score}% ({quizResult.passed ? 'Passed' : 'Needs Review'})
                  </span>
                </div>
              )}
            </div>

            {isEnrolled ? (
              <button 
                onClick={() => onStartQuiz(course)}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-lg transition-all whitespace-nowrap text-center"
              >
                {quizResult ? 'Retake Quiz' : 'Start Assessment'}
              </button>
            ) : (
              <span className="text-xs text-stone-900 bg-stone-100 px-4 py-2 rounded-xl text-center">
                Enroll to unlock quiz
              </span>
            )}
          </div>
        </div>
      )}

    </div>
  );
}