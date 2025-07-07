"use client";

import { ReactNode } from "react";
import LoadingScreen from "@/components/loading/LoadingScreen";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PageWrapperProps {
  children: ReactNode;
  isLoading: boolean;
  error: Error | null;
  title: string;
  emptyMessage?: string;
  itemCount?: number;
}

const PageWrapper = ({ 
  children, 
  isLoading, 
  error, 
  title, 
  emptyMessage = "No posts found",
  itemCount 
}: PageWrapperProps) => {
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-52px)] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading {title.toLowerCase()}</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">
          {title} {itemCount !== undefined && `(${itemCount} posts)`}
        </h2>
        {itemCount === 0 && (
          <div className="p-8 text-center">
            <p className="text-gray-500">{emptyMessage}</p>
          </div>
        )}
        {children}
      </ScrollArea>
    </div>
  );
};

export default PageWrapper;