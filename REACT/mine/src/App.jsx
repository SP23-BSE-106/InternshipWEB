import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentList from './StudentList';
import StudentProfile from './StudentProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/student/:id" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
