import React, { useState } from "react";
import StudentList from "./StudentList";
import StudentProfile from "./StudentProfile";

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleViewProfile = (student) => {
    setSelectedStudent(student);
    setCurrentView('profile');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedStudent(null);
  };

  return (
    <div>
      {currentView === 'list' ? (
        <StudentList onViewProfile={handleViewProfile} />
      ) : (
        <StudentProfile 
          student={selectedStudent} 
          onBack={handleBackToList} 
        />
      )}
    </div>
  );
}

export default App;

