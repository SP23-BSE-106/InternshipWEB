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
      <div className="page-container modern-home">
        <div className="welcome-card">
          <div className="welcome-content">
            <img
              src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`}
              alt="Avatar"
              className="welcome-avatar"
            />
            <div className="welcome-text">
              <h1>Welcome back, {userName}!</h1>
              <p>
                You are logged in as a{" "}
                <span className="role-highlight">{userRole}</span>.
              </p>
            </div>
          </div>
        </div>

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

            <button onClick={handleLogout} className="dashboard-button secondary">
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container modern-home">
      <div className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to{" "}
              <span className="hero-title-gradient">University Portal</span>
            </h1>
            <p className="hero-subtitle">
              Your all-in-one platform for academic excellence. Connect, learn, and grow with our comprehensive university management system.
            </p>
          </div>
        </section>

        {/* Auth Section */}
        <div className="auth-section">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? "active" : ""}`}
              onClick={() => setIsLogin(false)}
            >
              Create Account
            </button>
          </div>

          <div className="auth-form-container">
            <h2 className="auth-form-title">
              {isLogin ? "Welcome Back!" : "Join Our Community"}
            </h2>
            <p className="auth-form-subtitle">
              {isLogin
                ? "Sign in to access your portal"
                : "Create your account to get started"}
            </p>

            <form
              onSubmit={isLogin ? handleLogin : handleRegister}
              className="auth-form"
            >
              {!isLogin && (
                <div className="form-group">
                  <label className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{ background: "#334155", color: "#fff" }}
                  />
                </div>
              )}

              <div className="form-group">
                <label className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ background: "#334155", color: "#fff" }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ background: "#334155", color: "#fff" }}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                  style={{ background: "#334155", color: "#fff" }}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              {!isLogin && role === "student" && (
                <div className="form-group">
                  <label className="form-label">
                    Roll Number
                  </label>
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
                  <label className="form-label">
                    Teacher ID
                  </label>
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

              <button
                type="submit"
                className="auth-submit-button"
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  borderRadius: "0.5rem",
                  padding: "0.75rem 2rem",
                  marginTop: "1rem",
                }}
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {error && (
              <div
                className="error-message"
                style={{ color: "#ef4444", marginTop: "1rem" }}
              >
                {error}
              </div>
            )}

            {success && (
              <div
                className="success-message"
                style={{ color: "#10b981", marginTop: "1rem" }}
              >
                {success}
              </div>
            )}

            <div className="auth-switch" style={{ marginTop: "1rem" }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                className="auth-switch-link"
                style={{
                  background: "none",
                  border: "none",
                  color: "#60a5fa",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Sign up now" : "Sign in here"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
