"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole, logout, getUserName } from "@/lib/auth";

export default function HomePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      setAuthenticated(authStatus);
      
      if (authStatus) {
        const role = getUserRole();
        setUserRole(role);
        const name = getUserName();
        setUserName(name);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      setAuthenticated(true);
      setUserRole(data.user.role);
      setUserName(data.user.name);

      setTimeout(() => {
        if (data.user.role === "student") {
          router.push("/students/dashboard");
        } else if (data.user.role === "teacher") {
          router.push("/teachers");
        } else if (data.user.role === "admin") {
          router.push("/admins");
        }
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const registrationData = { name, email, password, role };
    
    if (role === "student") {
      if (!rollNo) {
        setError("Roll number is required for students");
        return;
      }
      registrationData.rollNo = rollNo;
    } else if (role === "teacher") {
      if (!teacherId) {
        setError("Teacher ID is required for teachers");
        return;
      }
      registrationData.teacherId = teacherId;
    }

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registrationData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      setSuccess("Account created successfully! You can now login.");
      setIsLogin(true);
      setName("");
      setEmail("");
      setPassword("");
      setRollNo("");
      setTeacherId("");
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong");
    }
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUserRole(null);
    setUserName("");
  };

  if (authenticated) {
    return (
      <div className="page-container">
        <h1 className="page-title">Welcome back, {userName}!</h1>
        <p className="home-subtitle">
          You are logged in as a {userRole}. Access your dashboard from the navigation menu.
        </p>

        <div className="dashboard-section">
          <h2 className="dashboard-title">Your Dashboard</h2>
          
          <div className="dashboard-actions">
            {userRole === "student" && (
              <button 
                onClick={() => router.push("/students/dashboard")}
                className="dashboard-button primary"
              >
                Go to Student Portal
              </button>
            )}
            
            {userRole === "teacher" && (
              <button 
                onClick={() => router.push("/teachers")}
                className="dashboard-button primary"
              >
                Go to Teacher Portal
              </button>
            )}
            
            {userRole === "admin" && (
              <button 
                onClick={() => router.push("/admins")}
                className="dashboard-button primary"
              >
                Go to Admin Portal
              </button>
            )}
            
            <button 
              onClick={handleLogout}
              className="dashboard-button secondary"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>Quick Access</h3>
            <p>Navigate to your role-specific portal using the buttons above</p>
          </div>

          <div className="feature-card">
            <h3>Manage Profile</h3>
            <p>Update your personal information and preferences</p>
          </div>

          <div className="feature-card">
            <h3>Help & Support</h3>
            <p>Get assistance with any issues you encounter</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="gradient-text">University Portal</span>
            </h1>
            <p className="hero-subtitle">
              Your all-in-one platform for academic excellence. Connect, learn, and grow with our comprehensive university management system.
            </p>
            <div className="hero-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Student Success</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Teacher Tools</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Admin Control</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card">
              <div className="card-icon">📖</div>
              <h3>Modern Learning</h3>
              <p>Experience education reimagined</p>
            </div>
            <div className="floating-card secondary">
              <div className="card-icon">📈</div>
              <h3>Real-time Analytics</h3>
              <p>Track progress instantly</p>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Section */}
      <div className="auth-section">
        <div className="auth-container">
          {/* Auth Tabs */}
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <span className="tab-icon">→</span>
              Login
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <span className="tab-icon">+</span>
              Create Account
            </button>
          </div>

          {/* Auth Form */}
          <div className="auth-form-container">
            <h2 className="auth-form-title">
              {isLogin ? "Welcome Back!" : "Join Our Community"}
            </h2>
            <p className="auth-form-subtitle">
              {isLogin ? "Sign in to access your portal" : "Create your account to get started"}
            </p>

            <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {!isLogin && role === "student" && (
                <div className="form-group">
                  <label className="form-label">Roll Number</label>
                  <input
                    type="text"
                    placeholder="Enter your roll number"
                    className="form-input"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    required
                  />
                </div>
              )}

              {!isLogin && role === "teacher" && (
                <div className="form-group">
                  <label className="form-label">Teacher ID</label>
                  <input
                    type="text"
                    placeholder="Enter your teacher ID"
                    className="form-input"
                    value={teacherId}
                    onChange={(e) => setTeacherId(e.target.value)}
                    required
                  />
                </div>
              )}

              <button type="submit" className="auth-submit-button">
                <span className="button-icon">
                  {isLogin ? "🔐" : "✨"}
                </span>
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {success}
              </div>
            )}

            <div className="auth-switch">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                className="auth-switch-link"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up now" : "Sign in here"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="features-showcase">
        <h2 className="showcase-title">Why Choose University Portal?</h2>
        <p className="showcase-subtitle">
          Experience the future of academic management with our cutting-edge platform
        </p>

        <div className="showcase-grid">
          <div className="showcase-card">
            <div className="showcase-icon">🚀</div>
            <h3>Modern Interface</h3>
            <p>Beautiful, intuitive design that makes navigation effortless and enjoyable for all users.</p>
          </div>

          <div className="showcase-card">
            <div className="showcase-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Advanced security measures protect your data and ensure complete privacy.</p>
          </div>

          <div className="showcase-card">
            <div className="showcase-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Works perfectly on all devices - desktop, tablet, or mobile.</p>
          </div>

          <div className="showcase-card">
            <div className="showcase-icon">⚡</div>
            <h3>Fast Performance</h3>
            <p>Lightning-fast loading times and smooth interactions for optimal user experience.</p>
          </div>

          <div className="showcase-card">
            <div className="showcase-icon">🎯</div>
            <h3>Role-Based Access</h3>
            <p>Tailored experiences for students, teachers, and administrators.</p>
          </div>

          <div className="showcase-card">
            <div className="showcase-icon">💡</div>
            <h3>Smart Features</h3>
            <p>Advanced tools for assignments, grading, attendance, and more.</p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your Academic Experience?</h2>
          <p className="cta-subtitle">
            Join thousands of students and educators who trust University Portal for their academic journey.
          </p>
          <div className="cta-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">99.9%</span>
              <span className="stat-label">Uptime</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
          <button 
            className="cta-button"
            onClick={() => setIsLogin(false)}
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
