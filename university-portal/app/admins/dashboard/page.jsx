"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole, logout, getUserName, getUserEmailFromToken, getUserId } from "@/lib/auth";

export default function AdminDashboard() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalAdmins: 0,
    totalClasses: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [systemStatus, setSystemStatus] = useState({
    database: "online",
    api: "online",
    storage: "online"
  });
  const [loading, setLoading] = useState(true);

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
        
        const name = getUserName();
        setUserName(name);
        // Fetch actual admin email from API
        fetchAdminDetails();
        setAvatarUrl(`https://api.dicebear.com/7.x/identicon/svg?seed=${name}`);
        loadMockData();
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const loadMockData = () => {
    setStats({
      totalStudents: 245,
      totalTeachers: 15,
      totalAdmins: 3,
      totalClasses: 30
    });

    setRecentUsers([
      { id: 1, name: "Ali Raza", email: "ali@example.com", role: "student", joinDate: "2024-01-15" },
      { id: 2, name: "Dr. Smith", email: "smith@example.com", role: "teacher", joinDate: "2024-01-14" },
      { id: 3, name: "Sara Khan", email: "sara@example.com", role: "student", joinDate: "2024-01-13" },
      { id: 4, name: "Prof. Johnson", email: "johnson@example.com", role: "teacher", joinDate: "2024-01-12" }
    ]);

    setSystemStatus({
      database: "online",
      api: "online",
      storage: "online"
    });
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    router.push("/");
  };

  const fetchAdminDetails = async () => {
    try {
      const email = getUserEmailFromToken();
      if (email) {
        setUserEmail(email);
      } else {
        // Fallback to API if email not in token
        const userId = getUserId();
        if (userId) {
          const res = await fetch(`/api/admins/${userId}`);
          if (res.ok) {
            const adminData = await res.json();
            setUserEmail(adminData.email);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToManagement = () => {
    router.push("/admins");
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
          <h1 className="page-title" style={{textAlign: 'left', fontSize: '2.5rem', marginBottom: '1rem'}}>Admin Dashboard</h1>
          <p className="dashboard-subtitle" style={{textAlign: 'left', fontSize: '1.15rem', marginBottom: '2rem'}}>
            Welcome back, <span style={{color: '#60a5fa', fontWeight: 600}}>{userName}</span>!
          </p>
          <ul style={{marginBottom: '2rem', paddingLeft: '1.5rem'}}>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Manage users and system access</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Monitor system statistics and performance</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>Configure system settings and permissions</li>
            <li style={{marginBottom: '0.5rem', fontSize: '1.05rem'}}>View analytics and reports</li>
          </ul>
          <nav style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
            <button
              className="action-button primary"
              onClick={() => router.push('/admins/management')}
            >
              Go to Admin Management
            </button>
            <button
              className="action-button secondary"
              onClick={() => router.push('/admins')}
            >
              Admin Dashboard
            </button>
          </nav>
        </div>
        <div style={{flex: 1, minWidth: 300, display: 'flex', justifyContent: 'center'}}>
          {avatarUrl && (
            <img src={avatarUrl} alt="Avatar" style={{width: 180, height: 180, borderRadius: '50%', background: '#334155', border: '3px solid #60a5fa', boxShadow: '0 8px 32px rgba(59,130,246,0.15)'}} />
          )}
        </div>
      </div>

      {/* Admin Info Card */}
      <div className="info-card" style={{marginTop: '2rem'}}>
        <h3 className="info-card-title">Admin Information</h3>
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
            <span className="info-value">Administrator</span>
          </div>
          <div className="info-item">
            <span className="info-label">Access Level:</span>
            <span className="info-value">Full System Access</span>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard-grid" style={{marginTop: '2rem'}}>
        {/* Total Students */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Total Students</h3>
          <div className="card-content" style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#60a5fa', marginBottom: '1rem'}}>
              {stats.totalStudents}
            </div>
            <p style={{color: '##94a3b8', margin: 0}}>Registered students in the system</p>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Total Teachers</h3>
          <div className="card-content" style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#10b981', marginBottom: '1rem'}}>
              {stats.totalTeachers}
            </div>
            <p style={{color: '##94a3b8', margin: 0}}>Active teaching staff</p>
          </div>
        </div>

        {/* Total Admins */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Total Admins</h3>
          <div className="card-content" style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '1rem'}}>
              {stats.totalAdmins}
            </div>
            <p style={{color: '##94a3b8', margin: 0}}>System administrators</p>
          </div>
        </div>

        {/* Total Classes */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Total Classes</h3>
          <div className="card-content" style={{textAlign: 'center'}}>
            <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '1rem'}}>
              {stats.totalClasses}
            </div>
            <p style={{color: '##94a3b8', margin: 0}}>Active classes running</p>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="dashboard-grid" style={{marginTop: '2rem'}}>
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">System Status</h3>
          <div className="card-content">
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>Database</span>
                <span style={{color: systemStatus.database === 'online' ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>
                  {systemStatus.database.toUpperCase()}
                </span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>API Service</span>
                <span style={{color: systemStatus.api === 'online' ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>
                  {systemStatus.api.toUpperCase()}
                </span>
              </div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <span>File Storage</span>
                <span style={{color: systemStatus.storage === 'online' ? '#10b981' : '#ef4444', fontWeight: 'bold'}}>
                  {systemStatus.storage.toUpperCase()}
                </span>
              </div>
            </div>
            <div style={{marginTop: '1rem', textAlign: 'center'}}>
              <button
                className="action-button secondary"
                onClick={() => router.push('/admins/management')}
                style={{width: '100%'}}
              >
                Manage System Settings
              </button>
            </div>
          </div>
        </div>

        {/* Recent Users */}
        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Recent Users</h3>
          <div className="card-content">
            {recentUsers.length === 0 ? (
              <p className="no-data">No recent users</p>
            ) : (
              <ul className="list">
                {recentUsers.map((user) => (
                  <li key={user.id} className="list-item">
                    <div className="list-item-main">
                      <span className="list-item-title">{user.name}</span>
                      <span className="list-item-subtitle">{user.email}</span>
                    </div>
                    <div className="list-item-right">
                      <span className="list-item-badge" style={{backgroundColor: 
                        user.role === 'student' ? 'rgba(96, 165, 250, 0.2)' :
                        user.role === 'teacher' ? 'rgba(16, 185, 129, 0.2)' :
                        'rgba(139, 92, 246, 0.2)',
                        color: user.role === 'student' ? '#60a5fa' :
                               user.role === 'teacher' ? '#10b981' :
                               '#8b5cf6'
                      }}>
                        {user.role}
                      </span>
                      <span className="list-item-date">Joined: {user.joinDate}</span>
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
              <button className="action-button primary" onClick={() => router.push('/admins/management')}>
                Manage Users
              </button>
              <button className="action-button secondary">
                System Settings
              </button>
              <button className="action-button secondary">
                View Reports
              </button>
              <button className="action-button secondary">
                Backup System
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-grid" style={{marginTop: '2rem'}}>
        <div className="feature-card">
          <h3>User Management</h3>
          <p>Manage students, teachers, and administrators with comprehensive user controls.</p>
        </div>
        <div className="feature-card">
          <h3>Analytics</h3>
          <p>Access detailed reports and analytics on system usage and performance.</p>
        </div>
        <div className="feature-card">
          <h3>System Configuration</h3>
          <p>Configure system settings, permissions, and access controls.</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section" style={{marginTop: '2rem'}}>
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon" style={{fontSize: '1.5rem', color: '#60a5fa'}}>UA</div>
            <div className="activity-content">
              <p>Added new student: Ali Raza</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{fontSize: '1.5rem', color: '#10b981'}}>UT</div>
            <div className="activity-content">
              <p>Registered new teacher: Dr. Smith</p>
              <span className="activity-time">1 day ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon" style={{fontSize: '1.5rem', color: '#8b5cf6'}}>SR</div>
            <div className="activity-content">
              <p>Generated monthly system report</p>
              <span className="activity-time">3 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
