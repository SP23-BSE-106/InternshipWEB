"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole } from "@/lib/auth";
import axios from "axios";

export default function AdminManagement() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Admin management state
  const [adminForm, setAdminForm] = useState({ name: "", email: "", password: "" });
  const [admins, setAdmins] = useState([]);
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminListLoading, setAdminListLoading] = useState(false);
  const [adminError, setAdminError] = useState("");

  // Student management state
  const [studentForm, setStudentForm] = useState({ name: "", email: "", password: "", rollNo: "" });
  const [students, setStudents] = useState([]);
  const [studentLoading, setStudentLoading] = useState(false);
  const [studentListLoading, setStudentListLoading] = useState(false);
  const [studentError, setStudentError] = useState("");

  // Teacher management state
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "", password: "", teacherId: "" });
  const [teachers, setTeachers] = useState([]);
  const [teacherLoading, setTeacherLoading] = useState(false);
  const [teacherListLoading, setTeacherListLoading] = useState(false);
  const [teacherError, setTeacherError] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
      
      if (authStatus) {
        const role = getUserRole();
        if (role !== "admin") {
          if (role === "student") {
            router.push("/students");
          } else if (role === "teacher") {
            router.push("/teachers");
          }
          return;
        }
        
        fetchAdmins();
        fetchStudents();
        fetchTeachers();
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Admin functions
  const fetchAdmins = async () => {
    setAdminListLoading(true);
    try {
      const response = await axios.get("/api/admins");
      setAdmins(response.data);
    } catch (err) {
      console.error("Error fetching admins:", err);
      setAdminError("Failed to load admins");
    } finally {
      setAdminListLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError("");
    
    try {
      await axios.post("/api/admins", adminForm);
      alert("Admin added successfully!");
      setAdminForm({ name: "", email: "", password: "" });
      fetchAdmins();
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Failed to add admin. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setAdminError(errorMessage);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    
    try {
      await axios.delete(`/api/admins/${id}`);
      alert("Admin deleted successfully!");
      fetchAdmins();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete admin.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

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
      fetchStudents();
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
      fetchStudents();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete student.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

  // Teacher functions
  const fetchTeachers = async () => {
    setTeacherListLoading(true);
    try {
      const response = await axios.get("/api/teachers");
      setTeachers(response.data);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setTeacherError("Failed to load teachers");
    } finally {
      setTeacherListLoading(false);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    setTeacherLoading(true);
    setTeacherError("");
    
    try {
      await axios.post("/api/teachers", teacherForm);
      alert("Teacher added successfully!");
      setTeacherForm({ name: "", email: "", password: "", teacherId: "" });
      fetchTeachers();
    } catch (err) {
      console.error("Full error object:", err);
      console.error("Error response:", err.response);
      console.error("Error data:", err.response?.data);
      
      let errorMessage = "Failed to add teacher. Please try again.";
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      }
      
      setTeacherError(errorMessage);
    } finally {
      setTeacherLoading(false);
    }
  };

  const handleTeacherDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;
    
    try {
      await axios.delete(`/api/teachers/${id}`);
      alert("Teacher deleted successfully!");
      fetchTeachers();
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Failed to delete teacher.";
      alert(errorMessage);
      console.error("Delete Error:", err);
    }
  };

  const handleGoToDashboard = () => {
    router.push("/admins/dashboard");
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h1 className="page-title">Admin Management</h1>
        <button className="action-button secondary" onClick={handleGoToDashboard}>
          Back to Dashboard
        </button>
      </div>
      
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

      {/* Teacher Management Section */}
      <div className="management-section">
        <h2>Teacher Management</h2>
        
        {/* Add Teacher Form */}
        <div className="form-container">
          <h3>Add New Teacher</h3>
          {teacherError && <div className="error-message">{teacherError}</div>}
          <form onSubmit={handleTeacherSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={teacherForm.name}
              onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={teacherForm.email}
              onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Teacher ID"
              value={teacherForm.teacherId}
              onChange={(e) => setTeacherForm({ ...teacherForm, teacherId: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={teacherForm.password}
              onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
              required
              className="form-input"
            />
            <button 
              type="submit" 
              disabled={teacherLoading}
              className="form-button"
            >
              {teacherLoading ? 'Adding...' : 'Add Teacher'}
            </button>
          </form>
        </div>

        {/* Teachers List */}
        <div>
          <h3>Existing Teachers</h3>
          {teacherListLoading ? (
            <p className="loading-text">Loading teachers...</p>
          ) : teachers.length === 0 ? (
            <p className="loading-text">No teachers found.</p>
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
                        onClick={() => handleTeacherDelete(teacher._id)}
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

      {/* Admin Management Section */}
      <div className="management-section">
        <h2>Admin Management</h2>
        
        {/* Add Admin Form */}
        <div className="form-container">
          <h3>Add New Admin</h3>
          {adminError && <div className="error-message">{adminError}</div>}
          <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              placeholder="Name"
              value={adminForm.name}
              onChange={(e) => setAdminForm({ ...adminForm, name: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="email"
              placeholder="Email"
              value={adminForm.email}
              onChange={(e) => setAdminForm({ ...adminForm, email: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminForm.password}
              onChange={(e) => setAdminForm({ ...adminForm, password: e.target.value })}
              required
              className="form-input"
            />
            <button 
              type="submit" 
              disabled={adminLoading}
              className="form-button"
            >
              {adminLoading ? 'Adding...' : 'Add Admin'}
            </button>
          </form>
        </div>

        {/* Admins List */}
        <div>
          <h3>Existing Admins</h3>
          {adminListLoading ? (
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
                        onClick={() => handleAdminDelete(admin._id)}
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
