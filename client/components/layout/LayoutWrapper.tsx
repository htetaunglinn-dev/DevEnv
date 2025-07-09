"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/navbar/Navbar";
import SideDrawer from "@/components/layout/sidedrawer/SideDrawer";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ReactNode } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isAuthenticated, loading } = useAuth();
  const pathname = usePathname();
  
  // Auth pages that should not show navbar/sidebar
  const authPages = ['/login', '/signup'];
  const isAuthPage = authPages.includes(pathname);

  // If it's an auth page, render with theme toggle in top-right corner
  if (isAuthPage) {
    return (
      <div className="relative">
        <div className="absolute top-4 right-4 z-10">
          <ModeToggle />
        </div>
        {children}
      </div>
    );
  }

  // Loading state
  if (loading) {
    return <LoadingScreen />;
  }

  // If user is authenticated, show full layout
  if (isAuthenticated) {
    return (
      <div>
        <Navbar />
        <div className="wrapper flex">
          <SideDrawer />
          {children}
        </div>
      </div>
    );
  }

  // If user is not authenticated and not on auth page, show navbar with auth buttons
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 dark:text-white">Welcome to DevEnv</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Please sign in to access the content.</p>
        </div>
      </div>
    </div>
  );
}