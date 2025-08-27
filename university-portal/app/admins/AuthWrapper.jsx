"use client"; // Marking this file as a client component
import { useAuth } from '../../lib/useAuth'; // Correcting the import path
import Dashboard from './dashboard/page';

const AuthWrapper = () => {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  return (
    <>
      {isAuthenticated ? <Dashboard /> : <p>Please log in to access the dashboard.</p>}
    </>
  );
};

export default AuthWrapper;
