"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, getUserRole, logout, getUserName } from "@/lib/auth";

export default function Navigation() {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Function to check and update auth state
  const checkAuth = () => {
    const authStatus = isAuthenticated();
    setIsAuthenticatedUser(authStatus);

    if (authStatus) {
      const role = getUserRole();
      setUserRole(role);
      const name = getUserName();
      setUserName(name);
    } else {
      setUserRole(null);
      setUserName("");
    }
  };

  useEffect(() => {
    // Check auth on mount
    checkAuth();

    // Set up interval to check auth state periodically
    const interval = setInterval(checkAuth, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    // The logout function already redirects, so we don't need to update state here
  };

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          <div className="navbar-logo">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" 
              alt="University Portal" 
              className="logo-icon"
            />
            <span className="logo-text">University Portal</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          {isAuthenticatedUser ? (
            <div className="navbar-user">
             
              <button onClick={handleLogout} className="logout-btn">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/126/126467.png" 
                  alt="Logout" 
                  className="logout-icon"
                />
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Link 
                href="/" 
                className={`navbar-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-menu">
            {isAuthenticatedUser ? (
              <>
                <div className="mobile-user-info">
                  <img 
                    src={`https://api.dicebear.com/7.x/identicon/svg?seed=${userName}`} 
                    alt="User Avatar" 
                    className="mobile-avatar"
                  />
                  <span className="mobile-user-name">{userName}</span>
                </div>
                <button onClick={handleLogout} className="mobile-logout-btn">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/126/126467.png" 
                    alt="Logout" 
                    className="mobile-logout-icon"
                  />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/" 
                  className={`mobile-link ${isActive("/") ? "active" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
