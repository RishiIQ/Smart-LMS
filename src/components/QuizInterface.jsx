import { useState } from 'react';
import { ArrowLeft, Award, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export default function QuizInterface({ course, student, onBack, onSubmitQuizScore }) {
  const quiz = course.quiz;
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!quiz) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center space-y-4 max-w-xl mx-auto">
        <p className="text-stone-500 text-sm">No quiz available for this course.</p>
        <button onClick={onBack} className="px-5 py-2.5 bg-emerald-900 text-white rounded-xl text-xs sm:text-sm font-medium">Back</button>
      </div>
    );
  }

  const handleSelectOption = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quiz.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = calculatedScore >= 50;

    setScore(calculatedScore);
    setSubmitted(true);
    onSubmitQuizScore(course.id, calculatedScore, passed);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
      
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-sm transition-all"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Course Overview
      </button>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-3">
        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
          Assessment
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">{quiz.title}</h1>
        <p className="text-stone-500 text-xs sm:text-sm">
          Answer all questions carefully. Passing score is 50% or higher.
        </p>
      </div>

      {/* Result Card if Submitted */}
      {submitted && (
        <div className={`rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
          score >= 50 ? 'bg-gradient-to-r from-emerald-900 to-stone-900' : 'bg-gradient-to-r from-rose-950 to-stone-900'
        }`}>
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
              {score >= 50 ? <Award className="w-3.5 h-3.5 text-amber-400" /> : <AlertCircle className="w-3.5 h-3.5 text-rose-400" />}
              {score >= 50 ? 'Assessment Passed Successfully' : 'Assessment Failed'}
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold">Your Score: {score}%</h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              {score >= 50 ? 'Congratulations! Your certificate of completion has been updated.' : 'Review the course material and retake the quiz when ready.'}
            </p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setSelectedAnswers({}); }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all border border-white/15 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((q, idx) => {
          const selectedOption = selectedAnswers[q.id];
          const isCorrect = submitted && selectedOption === q.correct;
          const isWrong = submitted && selectedOption !== q.correct;

          return (
            <div key={q.id} className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                  Question {idx + 1} of {quiz.questions.length}
                </span>
                {submitted && (
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1 ${
                    isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : null}
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                )}
              </div>

              <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg">{q.question}</h3>

              <div className="space-y-2.5 pt-2">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selectedOption === optIdx;
                  let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';

                  if (submitted) {
                    if (optIdx === q.correct) {
                      btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
                    } else if (isSelected && optIdx !== q.correct) {
                      btnStyle = 'bg-rose-100 border-rose-500 text-rose-900';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-emerald-900 text-white border-emerald-900 font-medium';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      disabled={submitted}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {submitted && optIdx === q.correct && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-900 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-lg transition-all text-sm sm:text-base text-center"
          >
            Submit Assessment
          </button>
        </div>
      )}

    </div>
  );
}