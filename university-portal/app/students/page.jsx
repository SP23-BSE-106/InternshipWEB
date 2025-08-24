"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentPage() {
  // Student management state
  const [studentForm, setStudentForm] = useState({ name: "", email: "", password: "", rollNo: "" });
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentListLoading, setStudentListLoading] = useState(false);
  const [studentError, setStudentError] = useState("");

  // Fetch data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  // Student functions
  const fetchStudents = async () => {
    setStudentListLoading(true);
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setStudentError("Failed to load students");
    } finally {
      setStudentListLoading(false);
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setStudentLoading(true);
    setStudentError("");
    
    try {
      await axios.post("/api/students", studentForm);
      alert("Student added successfully!");
      setStudentForm({ name: "", email: "", password: "", rollNo: "" });
      fetchStudents(); // Refresh the list
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Failed to add student. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setStudentError(errorMessage);
    } finally {
      setStudentLoading(false);
    }
  };

  const handleStudentDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    
    try {
      await axios.delete(`/api/students/${id}`);
      alert("Student deleted successfully!");
      fetchStudents(); // Refresh the list
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete student.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Student Management</h1>
      
      {/* Student Management Section */}
      <div className="management-section">
        <h2>Student Management</h2>
        
        {/* Add Student Form */}
        <div className="form-container">
          <h3>Add New Student</h3>
          {studentError && <div className="error-message">{studentError}</div>}
          <form onSubmit={handleStudentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={studentForm.name}
              onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={studentForm.email}
              onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Roll Number"
              value={studentForm.rollNo}
              onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={studentForm.password}
              onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
              required
              className="form-input"
            />
            <button 
              type="submit" 
              disabled={studentLoading}
              className="form-button"
            >
              {studentLoading ? 'Adding...' : 'Add Student'}
            </button>
          </form>
        </div>

        {/* Students List */}
        <div>
          <h3>Existing Students</h3>
          {studentListLoading ? (
            <p className="loading-text">Loading students...</p>
          ) : students.length === 0 ? (
            <p className="loading-text">No students found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.rollNo}</td>
                    <td>
                      <button 
                        onClick={() => handleStudentDelete(student._id)}
                        className="action-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
