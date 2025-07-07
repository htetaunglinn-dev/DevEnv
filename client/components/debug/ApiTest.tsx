"use client";

import { usePopularPosts } from "@/hooks/usePosts";

export const ApiTest = () => {
  const { data: postsData, isLoading, error } = usePopularPosts();

  console.log("API Test - isLoading:", isLoading);
  console.log("API Test - error:", error);
  console.log("API Test - postsData:", postsData);

  return (
    <div className="p-4 border rounded">
      <h3 className="font-bold">API Debug Test</h3>
      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <p>Error: {error ? error.message : "None"}</p>
      <p>Posts count: {postsData?.posts?.length || 0}</p>
      {postsData?.posts && (
        <div className="mt-2">
          <p>First post title: {postsData.posts[0]?.title}</p>
        </div>
      )}
    </div>
  );
};