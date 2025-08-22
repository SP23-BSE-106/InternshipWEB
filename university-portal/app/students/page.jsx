"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function StudentPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", rollNo: "" });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setListLoading(true);
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("Failed to load students");
    } finally {
      setListLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await axios.post("/api/students", form);
      alert("Student added successfully!");
      setForm({ name: "", email: "", password: "", rollNo: "" });
      fetchStudents(); // Refresh the list
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error headers:", err.response?.headers);
      
      let errorMessage = "Failed to add student. Please try again.";
      
      if (err.response?.data) {
        // Try different possible error formats
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
      
      {/* Add Student Form */}
      <div className="form-container">
        <h2>Add New Student</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="form-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="form-input"
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={form.rollNo}
            onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="form-input"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="form-button"
          >
            {loading ? 'Adding...' : 'Add Student'}
          </button>
        </form>
      </div>

      {/* Students List */}
      <div>
        <h2>Existing Students</h2>
        {listLoading ? (
          <p className="loading-text">Loading students...</p>
        ) : students.length === 0 ? (
          <p className="loading-text">No students found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roll No</th>
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
                      onClick={() => handleDelete(student._id)}
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
  );
}
