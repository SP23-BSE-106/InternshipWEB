"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserRole } from "@/lib/auth";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = isAuthenticated();
      
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
        
        // Redirect to admin dashboard
        router.push("/admins/dashboard");
      } else {
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className="page-container">
      <div className="loading-spinner">Redirecting to Admin Dashboard...</div>
    </div>
  );
}
