"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Show auth forms if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-auto bg-white dark:bg-gray-900">
        {authMode === "login" ? (
          <LoginPage onSwitchToSignup={() => setAuthMode("signup")} />
        ) : (
          <SignupPage onSwitchToLogin={() => setAuthMode("login")} />
        )}
      </div>
    );
  }

  // Show main app if authenticated
  return <>{children}</>;
}
