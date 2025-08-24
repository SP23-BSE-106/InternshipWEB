"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole, logout, getUserName, getUserId, getUserEmailFromToken } from "@/lib/auth";

export default function StudentDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRollNo, setUserRollNo] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      console.log("Checking authentication in student dashboard...");
      const authStatus = isAuthenticated();
      console.log("Authentication status:", authStatus);
      setAuthenticated(authStatus);
      
      if (authStatus) {
        const role = getUserRole();
        console.log("User role:", role);
        
        if (role !== "student") {
          console.log("User role is not student, redirecting...");
          // Redirect to appropriate portal based on role
          if (role === "teacher") {
            router.push("/teachers");
          } else if (role === "admin") {
            router.push("/admins");
          }
          return;
        }
        
        const name = getUserName();
        setUserName(name);
        console.log("User name:", name);
        
        // Use mock data for now to avoid token parsing issues
  setUserEmail("student@example.com");
  setUserRollNo("ROLL1234");
  // Generate a random avatar for demo
  setAvatarUrl(`https://api.dicebear.com/7.x/identicon/svg?seed=${name}`);
  // Load mock data immediately without fetching from API
  loadMockData();
  setLoading(false);
      } else {
        console.log("Not authenticated, redirecting to home");
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const fetchStudentDetails = async () => {
    try {
      const userId = getUserId();
      console.log("Fetching student details for user ID:", userId);
      
      const res = await fetch(`/api/students/${userId}`);
      console.log("Student details response status:", res.status);
      
      if (res.ok) {
        const studentData = await res.json();
        console.log("Student data received:", studentData);
        
        setUserEmail(studentData.email);
        setUserRollNo(studentData.rollNo);
        
        // Load mock data for courses, assignments, and grades
        loadMockData();
      } else {
        console.error("Failed to fetch student details, status:", res.status);
        const errorData = await res.text();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMockData = () => {
    // Mock data for demonstration
    setCourses([
      { id: 1, name: "Mathematics 101", instructor: "Dr. Smith", credits: 3 },
      { id: 2, name: "Computer Science Fundamentals", instructor: "Prof. Johnson", credits: 4 },
      { id: 3, name: "English Composition", instructor: "Dr. Williams", credits: 3 }
    ]);

    setAssignments([
      { id: 1, course: "Mathematics 101", title: "Calculus Assignment", dueDate: "2024-01-20", status: "Submitted" },
      { id: 2, course: "Computer Science Fundamentals", title: "Programming Project", dueDate: "2024-01-25", status: "Pending" },
      { id: 3, course: "English Composition", title: "Essay Writing", dueDate: "2024-01-18", status: "Submitted" }
    ]);

    setGrades([
      { course: "Mathematics 101", assignment: "Midterm Exam", grade: "A-", percentage: 87 },
      { course: "Computer Science Fundamentals", assignment: "Quiz 1", grade: "B+", percentage: 89 },
      { course: "English Composition", assignment: "Essay 1", grade: "A", percentage: 92 }
    ]);
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    router.push("/");
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
      {/* Hero Section */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '2rem'}}>
        <div style={{flex: 1, minWidth: 300}}>
          <h1 className="page-title" style={{textAlign: 'left', fontSize: '2.5rem', marginBottom: '1rem'}}>Student Dashboard</h1>
          <p className="dashboard-subtitle" style={{textAlign: 'left', fontSize: '1.15rem', marginBottom: '2rem'}}>
            Welcome back, <span style={{color: '#60a5fa', fontWeight: 600}}>{userName}</span>! ({userRollNo})
          </p>
          <ul style={{marginBottom: '2rem', paddingLeft: '1.5rem'}}>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>📚 View and manage your enrolled courses</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>📝 Track assignments and deadlines</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>📊 Monitor your grades and performance</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>⚡ Quick actions for your academic needs</li>
          </ul>
        </div>
        <div style={{flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center'}}>
          {avatarUrl && (
            <img src={avatarUrl} alt="Avatar" style={{width: 180, height: 180, borderRadius: '50%', background: '#334155', border: '3px solid #60a5fa', boxShadow: '0 8px 32px rgba(59,130,246,0.15)'}} />
          )}
        </div>
      </div>

      {/* Student Info Card */}
      <div className="info-card" style={{marginTop: '2rem'}}>
        <h3 className="info-card-title">Student Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Name:</span>
            <span className="info-value">{userName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{userEmail}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Roll Number:</span>
            <span className="info-value">{userRollNo}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Role:</span>
            <span className="info-value">Student</span>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid" style={{marginTop: '2rem'}}>
        {/* My Courses */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">📚 My Courses</h3>
          <div className="card-content">
            {courses.length === 0 ? (
              <p className="no-data">No courses enrolled</p>
            ) : (
              <ul className="list">
                {courses.map((course) => (
                  <li key={course.id} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{course.name}</span>
                      <span className="list-item-subtitle">{course.instructor}</span>
                    </div>
                    <span className="list-item-badge">{course.credits} credits</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Assignments */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">📝 Assignments</h3>
          <div className="card-content">
            {assignments.length === 0 ? (
              <p className="no-data">No assignments</p>
            ) : (
              <ul className="list">
                {assignments.map((assignment) => (
                  <li key={assignment.id} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{assignment.title}</span>
                      <span className="list-item-subtitle">{assignment.course}</span>
                    </div>
                    <div className="list-item-right">
                      <span className="list-item-date">Due: {assignment.dueDate}</span>
                      <span className={`status-badge ${assignment.status.toLowerCase()}`}>
                        {assignment.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Grades */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">📊 Grades</h3>
          <div className="card-content">
            {grades.length === 0 ? (
              <p className="no-data">No grades available</p>
            ) : (
              <ul className="list">
                {grades.map((grade, index) => (
                  <li key={index} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{grade.assignment}</span>
                      <span className="list-item-subtitle">{grade.course}</span>
                    </div>
                    <div className="list-item-right">
                      <span className="grade-percentage">{grade.percentage}%</span>
                      <span className="grade-letter">{grade.grade}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">⚡ Quick Actions</h3>
          <div className="card-content">
            <div className="action-buttons">
              <button className="action-button primary">
                View Course Catalog
              </button>
              <button className="action-button secondary">
                Submit Assignment
              </button>
              <button className="action-button secondary">
                Check Schedule
              </button>
              <button className="action-button secondary">
                Contact Advisor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="features-grid" style={{marginTop: '2rem'}}>
        <div className="feature-card">
          <h3>🎓 Academic Progress</h3>
          <p>Track your grades, assignments, and course completion in real time.</p>
        </div>
        <div className="feature-card">
          <h3>📅 Schedule</h3>
          <p>Stay updated with upcoming deadlines and events.</p>
        </div>
        <div className="feature-card">
          <h3>💬 Support</h3>
          <p>Contact your advisor or get help whenever you need it.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section" style={{marginTop: '2rem'}}>
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📚</div>
            <div className="activity-content">
              <p>Enrolled in Mathematics 101</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📝</div>
            <div className="activity-content">
              <p>Submitted Calculus Assignment</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">📊</div>
            <div className="activity-content">
              <p>Received grade for Quiz 1: A-</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
