import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, PlayCircle, BookOpen } from 'lucide-react';

export default function LessonViewer({ course, initialLesson, student, onToggleLessonComplete, onBack }) {
  const [currentLessonId, setCurrentLessonId] = useState(initialLesson.id || course.lessons[0].id);

  const currentLessonIndex = course.lessons.findIndex(l => l.id === currentLessonId);
  const currentLesson = course.lessons[currentLessonIndex] || course.lessons[0];

  const completedLessons = student.completedLessons[course.id] || [];
  const isCompleted = completedLessons.includes(currentLesson.id);

  const hasPrev = currentLessonIndex > 0;
  const hasNext = currentLessonIndex < course.lessons.length - 1;

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentLessonId(course.lessons[currentLessonIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      setCurrentLessonId(course.lessons[currentLessonIndex + 1].id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white px-5 sm:px-6 py-4 rounded-2xl border border-stone-200 shadow-sm">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Course Overview
        </button>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full truncate">
          {course.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* Main Lesson Content Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 lg:p-10 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Lesson {currentLessonIndex + 1} of {course.lessons.length}
              </span>
              <span className="text-xs font-medium text-stone-500">{currentLesson.duration}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              {currentLesson.title}
            </h1>

            <hr className="border-stone-100" />

            <div className="prose text-stone-700 leading-relaxed text-sm sm:text-base space-y-4">
              <p className="font-medium text-stone-900">Module Overview:</p>
              <p>{currentLesson.content}</p>
              
              <div className="bg-stone-50 rounded-2xl p-5 sm:p-6 border border-stone-200/80 space-y-3 mt-6">
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-emerald-800 shrink-0" /> Key Architectural Takeaways
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs text-stone-600">
                  <li>Understand core theoretical underpinnings and production tradeoffs.</li>
                  <li>Review industry patterns and best-practice implementation strategies.</li>
                  <li>Verify behavior using rigorous local state management and unit checks.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-6 sm:pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <button
              onClick={() => onToggleLessonComplete(course.id, currentLesson.id)}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                isCompleted 
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                  : 'bg-emerald-900 text-white hover:bg-emerald-800 shadow-md'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Lesson Completed ✓' : 'Mark as Complete'}
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handlePrev}
                disabled={!hasPrev}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-stone-200 flex items-center justify-center gap-1 ${
                  hasPrev ? 'bg-white text-stone-800 hover:bg-stone-50' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-4 h-4" /> Prev
              </button>
              <button
                onClick={handleNext}
                disabled={!hasNext}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-stone-200 flex items-center justify-center gap-1 ${
                  hasNext ? 'bg-white text-stone-800 hover:bg-stone-50' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                }`}
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Course Playlist Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 space-y-4 shadow-sm h-fit">
          <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg border-b border-stone-100 pb-3">
            Course Curriculum
          </h3>

          <div className="space-y-2">
            {course.lessons.map((lesson, idx) => {
              const isSelected = lesson.id === currentLesson.id;
              const completed = completedLessons.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => setCurrentLessonId(lesson.id)}
                  className={`p-3.5 sm:p-4 rounded-2xl cursor-pointer transition-all flex items-center justify-between ${
                    isSelected 
                      ? 'bg-emerald-900 text-white shadow-md' 
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-3 pr-2">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      isSelected ? 'bg-emerald-800 text-white' : completed ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <h5 className={`font-medium text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                        {lesson.title}
                      </h5>
                      <span className={`text-[10px] ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                        {lesson.duration}
                      </span>
                    </div>
                  </div>
                  {isSelected && <PlayCircle className="w-4 h-4 text-emerald-300 shrink-0" />}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}