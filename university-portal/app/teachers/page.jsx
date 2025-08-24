"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function TeacherPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    teacherId: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch teachers on component mount
  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    setListLoading(true);
    try {
      const response = await axios.get("/api/teachers");
      setTeachers(response.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to load teachers");
    } finally {
      setListLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/teachers", form);
      alert("Teacher added successfully!");
      setForm({ name: "", email: "", password: "", teacherId: "" });
      fetchTeachers(); // Refresh the list
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Error headers:", err.response?.headers);

      let errorMessage = "Failed to add teacher. Please try again.";

      if (err.response?.data) {
        // Try different possible error formats
        if (typeof err.response.data === "string") {
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
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    try {
      await axios.delete(`/api/teachers/${id}`);
      alert("Teacher deleted successfully!");
      fetchTeachers(); // Refresh the list
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "Failed to delete teacher.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Teacher Management</h1>

      {/* Add Teacher Form */}
      <div className="form-container">
        <h2>Add New Teacher</h2>
        {error && <div className="error-message">{error}</div>}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
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
            placeholder="Teacher ID"
            value={form.teacherId}
            onChange={(e) => setForm({ ...form, teacherId: e.target.value })}
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
          <button type="submit" disabled={loading} className="form-button">
            {loading ? "Adding..." : "Add Teacher"}
          </button>
        </form>
      </div>

      {/* Teachers List */}
      <div>
        <h2>Existing Teachers</h2>
        {listLoading ? (
          <p>Loading teachers...</p>
        ) : teachers.length === 0 ? (
          <p>No teachers found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Teacher ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher._id}>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.teacherId}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(teacher._id)}
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
