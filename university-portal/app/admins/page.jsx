"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setListLoading(true);
    try {
      const response = await axios.get("/api/admins");
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setError("Failed to load admins");
    } finally {
      setListLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await axios.post("/api/admins", form);
      alert("Admin added successfully!");
      setForm({ name: "", email: "", password: "" });
      fetchAdmins(); // Refresh the list
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Failed to add admin. Please try again.";
      
      if (err.response?.data) {
        // Try different possible error formats
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    
    try {
      await axios.delete(`/api/admins/${id}`);
      alert("Admin deleted successfully!");
      fetchAdmins(); // Refresh the list
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete admin.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Admin Management</h1>
      
      {/* Add Admin Form */}
      <div className="form-container">
        <h2>Add New Admin</h2>
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
            {loading ? 'Adding...' : 'Add Admin'}
          </button>
        </form>
      </div>

      {/* Admins List */}
      <div>
        <h2>Existing Admins</h2>
        {listLoading ? (
          <p className="loading-text">Loading admins...</p>
        ) : admins.length === 0 ? (
          <p className="loading-text">No admins found.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin._id}>
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td>
                    <button 
                      onClick={() => handleDelete(admin._id)}
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
