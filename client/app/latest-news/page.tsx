"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLatestPosts } from "@/hooks/usePosts";
import { transformPostsToArticles } from "@/lib/postTransform";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import BlogPost from "@/components/custom/BlogPost";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const LatestNewsPage = () => {
  const [latestNewsArticles, setLatestNewsArticles] = useState([]);
  const searchText = useStore((state) => state.searchText);
  const { data: postsData, isLoading, error } = useLatestPosts();

  useEffect(() => {
    if (postsData?.posts) {
      const articles = transformPostsToArticles(postsData.posts);
      const filtered = filterArticlesByTitle(articles, searchText);
      setLatestNewsArticles(filtered);
    }
  }, [postsData, searchText]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[calc(100vh-52px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center h-[calc(100vh-52px)]">
        <div className="text-center">
          <p className="text-red-500">Error loading latest news</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Latest News</h2>
        <BlogPost data={latestNewsArticles} />
      </ScrollArea>
    </div>
  );
};

export default LatestNewsPage;
