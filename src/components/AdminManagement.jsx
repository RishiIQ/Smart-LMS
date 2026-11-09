import React, { useState } from 'react';
import { Plus, Trash2, Edit3, ShieldCheck, X, BookOpen, HelpCircle } from 'lucide-react';

export default function AdminManagement({ courses, onAddCourse, onDeleteCourse, onUpdateCourse }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form states with blank initial values
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instructor, setInstructor] = useState('');
  const [level, setLevel] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  // Structured Lessons state (blank initial inputs)
  const [lessons, setLessons] = useState([{ title: '', duration: '', content: '' }]);

  // Structured Quiz state (blank initial inputs)
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correct: 0 }
  ]);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle('');
    setCategory('');
    setInstructor('');
    setLevel('');
    setPrice('');
    setDescription('');
    setImage('');
    setLessons([{ title: '', duration: '', content: '' }]);
    setQuizTitle('');
    setQuestions([{ question: '', options: ['', '', '', ''], correct: 0 }]);
    setIsModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingId(course.id);
    setTitle(course.title);
    setCategory(course.category);
    setInstructor(course.instructor);
    setLevel(course.level);
    setPrice(course.price);
    setDescription(course.description);
    setImage(course.image);
    setLessons(course.lessons ? course.lessons.map(l => ({ title: l.title, duration: l.duration, content: l.content })) : [{ title: '', duration: '', content: '' }]);
    setQuizTitle(course.quiz ? course.quiz.title : '');
    setQuestions(course.quiz && course.quiz.questions ? course.quiz.questions.map(q => ({ question: q.question, options: [...q.options], correct: q.correct })) : [{ question: '', options: ['', '', '', ''], correct: 0 }]);
    setIsModalOpen(true);
  };

  // Lesson handlers
  const handleAddLessonField = () => {
    setLessons(prev => [...prev, { title: '', duration: '', content: '' }]);
  };

  const handleLessonChange = (index, field, value) => {
    setLessons(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleRemoveLessonField = (index) => {
    if (lessons.length > 1) {
      setLessons(prev => prev.filter((_, i) => i !== index));
    }
  };

  // Quiz question handlers
  const handleAddQuestionField = () => {
    setQuestions(prev => [...prev, { question: '', options: ['', '', '', ''], correct: 0 }]);
  };

  const handleQuestionChange = (index, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[index].question = value;
      return updated;
    });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[qIndex].options[optIndex] = value;
      return updated;
    });
  };

  const handleCorrectChange = (qIndex, correctIndex) => {
    setQuestions(prev => {
      const updated = [...prev];
      updated[qIndex].correct = Number(correctIndex);
      return updated;
    });
  };

  const handleRemoveQuestionField = (index) => {
    if (questions.length > 1) {
      setQuestions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const formattedLessons = lessons.map((l, i) => ({
      id: Date.now() + i,
      title: l.title,
      duration: l.duration,
      content: l.content
    }));

    const formattedQuiz = {
      title: quizTitle || `${title} Assessment`,
      questions: questions.map((q, i) => ({
        id: i + 1,
        question: q.question,
        options: q.options,
        correct: Number(q.correct)
      }))
    };

    if (editingId) {
      const existingCourse = courses.find(c => c.id === editingId);
      const updatedData = {
        ...(existingCourse || {}),
        title,
        category,
        instructor,
        level,
        price,
        description,
        image,
        lessons: formattedLessons,
        quiz: formattedQuiz
      };
      onUpdateCourse(editingId, updatedData);
    } else {
      const newCourseData = {
        title,
        category,
        instructor,
        level,
        price,
        description,
        image,
        rating: 5.0,
        enrolledCount: 0,
        lessons: formattedLessons,
        quiz: formattedQuiz
      };
      onAddCourse(newCourseData);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      
      {/* Header & Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">Course Management</h1>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">Create, edit, and configure custom curriculum listings and assessments.</p>
        </div>

        <button 
          onClick={openCreateModal}
          className="w-full sm:w-auto px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Add New Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="bg-lime-100/80 rounded-3xl border border-stone-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-green-700 border-b border-stone-200 text-white text-xs font-semibold uppercase tracking-wider">
                <th className="p-4 sm:p-5">Course Title</th>
                <th className="p-4 sm:p-5">Category</th>
                <th className="p-4 sm:p-5">Instructor</th>
                <th className="p-4 sm:p-5">Price</th>
                <th className="p-4 sm:p-5">Lessons & Quiz</th>
                <th className="p-4 sm:p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs sm:text-sm text-stone-800">
              {courses.map(course => (
                <tr key={course.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-4 sm:p-5 font-serif font-bold text-stone-900 flex items-center gap-3">
                    <img src={course.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0" />
                    <span className="line-clamp-1">{course.title}</span>
                  </td>
                  <td className="p-4 sm:p-5 font-medium text-stone-600">
                    <span className="px-2.5 py-1 rounded-md bg-stone-100 text-xs">{course.category}</span>
                  </td>
                  <td className="p-4 sm:p-5 font-medium text-stone-600 truncate">{course.instructor}</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-800">{course.price}</td>
                  <td className="p-4 sm:p-5 text-stone-600 text-xs font-medium">
                    {course.lessons?.length || 0} Lessons, {course.quiz?.questions?.length || 0} Quiz Qs
                  </td>
                  <td className="p-4 sm:p-5 text-right space-x-2">
                    <button 
                      onClick={() => openEditModal(course)}
                      className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors inline-flex items-center"
                      title="Edit Course"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => onDeleteCourse(course.id)}
                      className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors inline-flex items-center"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <h3 className="font-serif font-bold text-stone-900 text-lg sm:text-xl">
                {editingId ? 'Edit Course & Curriculum' : 'Create New Course & Curriculum'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              
              {/* Basic Details Section */}
              <div className="space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider text-emerald-900">1. Basic Information</h4>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase">Course Title *</label>
                  <input 
                    type="text" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Enterprise React Architecture"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase">Category *</label>
                    <select 
                      value={category} 
                      onChange={e => setCategory(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      required
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Business">Business</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase">Level *</label>
                    <select 
                      value={level} 
                      onChange={e => setLevel(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      required
                    >
                      <option value="" disabled>Select Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase">Instructor Name *</label>
                    <input 
                      type="text" 
                      value={instructor} 
                      onChange={e => setInstructor(e.target.value)}
                      placeholder="e.g. Dr. Elena Vance"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 uppercase">Price *</label>
                    <input 
                      type="text" 
                      value={price} 
                      onChange={e => setPrice(e.target.value)}
                      placeholder="e.g. $149"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase">Image URL *</label>
                  <input 
                    type="url" 
                    value={image} 
                    onChange={e => setImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase">Description *</label>
                  <textarea 
                    rows={3}
                    value={description} 
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Comprehensive course overview..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
                    required
                  />
                </div>
              </div>

              <hr className="border-stone-200" />

              {/* Lessons Curriculum Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" /> 2. Course Lessons ({lessons.length})
                  </h4>
                  <button 
                    type="button"
                    onClick={handleAddLessonField}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-all"
                  >
                    + Add Lesson
                  </button>
                </div>

                {lessons.map((lesson, lIdx) => (
                  <div key={lIdx} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 relative">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500">Lesson #{lIdx + 1}</span>
                      {lessons.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => handleRemoveLessonField(lIdx)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <input 
                          type="text" 
                          placeholder="Lesson Title *" 
                          value={lesson.title} 
                          onChange={e => handleLessonChange(lIdx, 'title', e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                          required
                        />
                      </div>
                      <div>
                        <input 
                          type="text" 
                          placeholder="Duration (e.g. 20 mins) *" 
                          value={lesson.duration} 
                          onChange={e => handleLessonChange(lIdx, 'duration', e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <textarea 
                        rows={2}
                        placeholder="Lesson content summary / text body *" 
                        value={lesson.content} 
                        onChange={e => handleLessonChange(lIdx, 'content', e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-3 text-xs text-stone-800"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-stone-200" />

              {/* Quiz Assessment Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-stone-900 text-sm uppercase tracking-wider text-emerald-900 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" /> 3. Assessment Quiz
                  </h4>
                  <button 
                    type="button"
                    onClick={handleAddQuestionField}
                    className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-semibold transition-all"
                  >
                    + Add Question
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase">Quiz Title *</label>
                  <input 
                    type="text" 
                    value={quizTitle} 
                    onChange={e => setQuizTitle(e.target.value)}
                    placeholder="e.g. Architecture Mastery Quiz"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-stone-800"
                    required
                  />
                </div>

                {questions.map((q, qIdx) => (
                  <div key={qIdx} className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-500">Question #{qIdx + 1}</span>
                      {questions.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => handleRemoveQuestionField(qIdx)}
                          className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
                        >
                          Remove Question
                        </button>
                      )}
                    </div>

                    <input 
                      type="text" 
                      placeholder="Question statement *" 
                      value={q.question} 
                      onChange={e => handleQuestionChange(qIdx, e.target.value)}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                      required
                    />

                    <div className="space-y-2">
                      <label className="text-[11px] font-semibold text-stone-600 uppercase">Options (Select Correct Answer below) *</label>
                      {q.options.map((opt, optIdx) => (
                        <div key={optIdx} className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name={`correct-${qIdx}`} 
                            checked={q.correct === optIdx}
                            onChange={() => handleCorrectChange(qIdx, optIdx)}
                            title="Mark as correct answer"
                          />
                          <input 
                            type="text" 
                            placeholder={`Option ${optIdx + 1} *`} 
                            value={opt} 
                            onChange={e => handleOptionChange(qIdx, optIdx, e.target.value)}
                            className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-800"
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-stone-200">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-900 text-white hover:bg-emerald-800 shadow-md order-1 sm:order-2"
                >
                  {editingId ? 'Save Course Changes' : 'Publish New Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}