"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole, logout, getUserName, getUserEmailFromToken, getUserId } from "@/lib/auth";

export default function TeacherDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
      
      if (authStatus) {
        const role = getUserRole();
        if (role !== "teacher") {
          if (role === "student") {
            router.push("/students");
          } else if (role === "admin") {
            router.push("/admins");
          }
          return;
        }
        
        const name = getUserName();
        setUserName(name);
        // Fetch actual teacher email from API
        fetchTeacherDetails();
        setAvatarUrl(`https://api.dicebear.com/7.x/identicon/svg?seed=${name}`);
        
        // Mock data for demo
        setClasses([
          { id: 1, name: "Mathematics 101", students: 30, credits: 3 },
          { id: 2, name: "Computer Science Fundamentals", students: 25, credits: 4 },
          { id: 3, name: "English Composition", students: 28, credits: 3 }
        ]);

        setAssignments([
          { id: 1, title: "Calculus Assignment", class: "Mathematics 101", dueDate: "2024-01-20", submissions: 15, totalStudents: 30 },
          { id: 2, title: "Programming Project", class: "Computer Science Fundamentals", dueDate: "2024-01-25", submissions: 20, totalStudents: 25 },
          { id: 3, title: "Essay Writing", class: "English Composition", dueDate: "2024-01-18", submissions: 25, totalStudents: 28 }
        ]);

        setStudents([
          { name: "Ali Raza", class: "Mathematics 101", grade: "A", percentage: 95 },
          { name: "Sara Khan", class: "Computer Science Fundamentals", grade: "B+", percentage: 89 },
          { name: "Ahmed Hassan", class: "English Composition", grade: "A-", percentage: 90 }
        ]);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const fetchTeacherDetails = async () => {
    try {
      const email = getUserEmailFromToken();
      if (email) {
        setUserEmail(email);
      } else {
        // Fallback to API if email not in token
        const userId = getUserId();
        if (userId) {
          const res = await fetch(`/api/teachers/${userId}`);
          if (res.ok) {
            const teacherData = await res.json();
            setUserEmail(teacherData.email);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    } finally {
      setLoading(false);
    }
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
          <h1 className="page-title" style={{textAlign: 'left', fontSize: '2.5rem', marginBottom: '1rem'}}>Teacher Dashboard</h1>
          <p className="dashboard-subtitle" style={{textAlign: 'left', fontSize: '1.15rem', marginBottom: '2rem'}}>
            Welcome back, <span style={{color: '#60a5fa', fontWeight: 600}}>{userName}</span>!
          </p>
          <ul style={{marginBottom: '2rem', paddingLeft: '1.5rem'}}>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Manage your teaching classes and curriculum</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Create and track assignments and submissions</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Monitor student performance and grades</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Quick access to teaching tools and resources</li>
          </ul>
        </div>
        <div style={{flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center'}}>
          {avatarUrl && (
            <img src={avatarUrl} alt="Avatar" style={{width: 180, height: 180, borderRadius: '50%', background: '#334155', border: '3px solid #60a5fa', boxShadow: '0 8px 32px rgba(59,130,246,0.15)'}} />
          )}
        </div>
      </div>

      {/* Teacher Info Card */}
      <div className="info-card" style={{marginTop: '2rem'}}>
        <h3 className="info-card-title">Teacher Information</h3>
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
            <span className="info-label">Role:</span>
            <span className="info-value">Teacher</span>
          </div>
          <div className="info-item">
            <span className="info-label">Classes:</span>
            <span className="info-value">{classes.length}</span>
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid" style={{marginTop: '2rem'}}>
        {/* My Classes */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">My Classes</h3>
          <div className="card-content">
            {classes.length === 0 ? (
              <p className="no-data">No classes assigned</p>
            ) : (
              <ul className="list">
                {classes.map((cls) => (
                  <li key={cls.id} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{cls.name}</span>
                      <span className="list-item-subtitle">{cls.students} students</span>
                    </div>
                    <span className="list-item-badge">{cls.credits} credits</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Assignments */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Assignments</h3>
          <div className="card-content">
            {assignments.length === 0 ? (
              <p className="no-data">No assignments created</p>
            ) : (
              <ul className="list">
                {assignments.map((assignment) => (
                  <li key={assignment.id} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{assignment.title}</span>
                      <span className="list-item-subtitle">{assignment.class}</span>
                    </div>
                    <div className="list-item-right">
                      <span className="list-item-date">Due: {assignment.dueDate}</span>
                      <span className={`status-badge ${assignment.submissions === assignment.totalStudents ? 'submitted' : assignment.submissions > 0 ? 'pending' : 'late'}`}>
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Student Performance */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Student Performance</h3>
          <div className="card-content">
            {students.length === 0 ? (
              <p className="no-data">No student data available</p>
            ) : (
              <ul className="list">
                {students.map((student, index) => (
                  <li key={index} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{student.name}</span>
                      <span className="list-item-subtitle">{student.class}</span>
                    </div>
                    <div className="list-item-right">
                      <span className="grade-percentage">{student.percentage}%</span>
                      <span className="grade-letter">{student.grade}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Quick Actions</h3>
          <div className="card-content">
            <div className="action-buttons">
              <button className="action-button primary">
                Create Assignment
              </button>
              <button className="action-button secondary">
                Grade Submissions
              </button>
              <button className="action-button secondary">
                View Attendance
              </button>
              <button className="action-button secondary">
                Schedule Class
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-grid" style={{marginTop: '2rem'}}>
        <div className="feature-card">
          <h3>Teaching Tools</h3>
          <p>Access comprehensive teaching resources, lesson plans, and curriculum materials.</p>
        </div>
        <div className="feature-card">
          <h3>Class Schedule</h3>
          <p>Manage your class timetable and keep track of upcoming sessions.</p>
        </div>
        <div className="feature-card">
          <h3>Analytics</h3>
          <p>Get insights into student performance and class statistics.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section" style={{marginTop: '2rem'}}>
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">A</div>
            <div className="activity-content">
              <p>Created new assignment for Mathematics 101</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">G</div>
            <div className="activity-content">
              <p>Graded 15 submissions for Programming Project</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">U</div>
            <div className="activity-content">
              <p>Updated attendance records for all classes</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
