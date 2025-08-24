"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isAuthenticated, getUserRole, logout } from "@/lib/auth";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check authentication status on component mount and when pathname changes
    setAuthenticated(isAuthenticated());
    setUserRole(getUserRole());
  }, [pathname]);

  const isActive = (path) => {
    return pathname === path;
  };

  const handleLogout = () => {
    logout();
    setAuthenticated(false);
    setUserRole(null);
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <Link href="/" className="nav-logo">
          University Portal
        </Link>
        
        <ul className="nav-links">
          <li>
            <Link 
              href="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          
          {authenticated && userRole === "admin" && (
            <li>
              <Link 
                href="/admins" 
                className={`nav-link ${isActive('/admins') ? 'active' : ''}`}
              >
                Admins
              </Link>
            </li>
          )}
          
          {authenticated && userRole === "student" && (
            <li>
              <Link 
                href="/students/dashboard" 
                className={`nav-link ${isActive('/students/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
            </li>
          )}
          
          {authenticated && userRole === "teacher" && (
            <li>
              <Link 
                href="/teachers" 
                className={`nav-link ${isActive('/teachers') ? 'active' : ''}`}
              >
                Teachers
              </Link>
            </li>
          )}

          {authenticated && (
            <li>
              <button 
                onClick={handleLogout}
                className="nav-link logout-button"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
