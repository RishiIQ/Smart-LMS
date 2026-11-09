import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import CourseCatalogue from './components/CourseCatalogue';
import CourseDetails from './components/CourseDetails';
import MyCourses from './components/MyCourses';
import LessonViewer from './components/LessonViewer';
import QuizInterface from './components/QuizInterface';
import StudentProfile from './components/StudentProfile';
import AdminManagement from './components/AdminManagement';
import { initialCourses, initialStudent } from './components/data';

export default function App() {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('smart_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [student, setStudent] = useState(() => {
    const saved = localStorage.getItem('smart_student');
    return saved ? JSON.parse(saved) : initialStudent;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeLesson, setActiveLesson] = useState(null);
  const [viewingQuiz, setViewingQuiz] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('smart_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('smart_student', JSON.stringify(student));
  }, [student]);

  const handleEnroll = (courseId) => {
    if (!student.enrolledCourses.includes(courseId)) {
      setStudent(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      }));
    }
  };

  const handleToggleLessonComplete = (courseId, lessonId) => {
    setStudent(prev => {
      const courseCompleted = prev.completedLessons[courseId] || [];
      const updatedCourseLessons = courseCompleted.includes(lessonId)
        ? courseCompleted.filter(id => id !== lessonId)
        : [...courseCompleted, lessonId];

      return {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [courseId]: updatedCourseLessons
        }
      };
    });
  };

  const handleSubmitQuizScore = (courseId, score, passed) => {
    setStudent(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [courseId]: { score, passed }
      }
    }));
  };

  const handleUpdateProfile = (updatedProfile) => {
    setStudent(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  const handleAddCourse = (newCourseData) => {
    const newCourse = { ...newCourseData, id: Date.now() };
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    if (selectedCourse?.id === courseId) {
      setSelectedCourse(null);
      setViewingQuiz(false);
      setActiveLesson(null);
    }
  };

  const handleUpdateCourse = (courseId, updatedData) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, ...updatedData } : c));
    if (selectedCourse?.id === courseId) {
      setSelectedCourse(prev => ({ ...prev, ...updatedData }));
    }
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setViewingQuiz(false);
    setActiveLesson(null);
  };

  const handleStartLesson = (course, lesson) => {
    setSelectedCourse(course);
    setActiveLesson(lesson);
    setViewingQuiz(false);
  };

  const handleStartQuiz = (course) => {
    setSelectedCourse(course);
    setActiveLesson(null);
    setViewingQuiz(true);
  };

  return (
    <div className="min-h-screen bg-green-100/20 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedCourse(null);
          setActiveLesson(null);
          setViewingQuiz(false);
        }} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {activeLesson ? (
          <LessonViewer 
            course={selectedCourse}
            initialLesson={activeLesson}
            student={student}
            onToggleLessonComplete={handleToggleLessonComplete}
            onBack={() => setActiveLesson(null)}
          />
        ) : viewingQuiz ? (
          <QuizInterface 
            course={selectedCourse}
            student={student}
            onBack={() => setViewingQuiz(false)}
            onSubmitQuizScore={handleSubmitQuizScore}
          />
        ) : selectedCourse ? (
          <CourseDetails 
            course={selectedCourse}
            student={student}
            onBack={() => setSelectedCourse(null)}
            onEnroll={handleEnroll}
            onStartLesson={handleStartLesson}
            onStartQuiz={handleStartQuiz}
          />
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <StudentDashboard 
                student={student} 
                courses={courses} 
                onSelectCourse={handleSelectCourse} 
                setActiveTab={setActiveTab} 
              />
            )}
            {activeTab === 'catalogue' && (
              <CourseCatalogue 
                courses={courses} 
                student={student} 
                onEnroll={handleEnroll} 
                onSelectCourse={handleSelectCourse}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            )}
            {activeTab === 'my-courses' && (
              <MyCourses 
                student={student} 
                courses={courses} 
                onSelectCourse={handleSelectCourse} 
                setActiveTab={setActiveTab} 
              />
            )}
            {activeTab === 'profile' && (
              <StudentProfile 
                student={student} 
                onUpdateProfile={handleUpdateProfile} 
                courses={courses} 
              />
            )}
            {activeTab === 'admin' && (
              <AdminManagement 
                courses={courses} 
                onAddCourse={handleAddCourse} 
                onDeleteCourse={handleDeleteCourse} 
                onUpdateCourse={handleUpdateCourse} 
              />
            )}
          </>
        )}
      </main>

    </div>
  );
}