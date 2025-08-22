"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
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
          
          <li>
            <Link 
              href="/admins" 
              className={`nav-link ${isActive('/admins') ? 'active' : ''}`}
            >
              Admins
            </Link>
          </li>
          
          <li>
            <Link 
              href="/students" 
              className={`nav-link ${isActive('/students') ? 'active' : ''}`}
            >
              Students
            </Link>
          </li>
          
          <li>
            <Link 
              href="/teachers" 
              className={`nav-link ${isActive('/teachers') ? 'active' : ''}`}
            >
              Teachers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
