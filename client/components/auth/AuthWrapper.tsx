"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/page";
import LoadingScreen from "@/components/loading/LoadingScreen";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingScreen />;
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
