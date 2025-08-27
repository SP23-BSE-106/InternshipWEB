"use client"; // Marking this file as a client component
import { useState, useEffect } from 'react';
import { isAuthenticated, getUserName } from './auth';

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState('');

  // Function to check and update auth state
  const checkAuth = () => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    if (authStatus) {
      setUserName(getUserName());
    } else {
      setUserName('');
    }
  };

  useEffect(() => {
    // Check auth on mount
    checkAuth();

    // Set up interval to check auth state periodically
    const interval = setInterval(checkAuth, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated: isAuth, userName, checkAuth };
};
