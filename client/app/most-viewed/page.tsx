"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMostViewedPosts } from "@/hooks/usePosts";
import { transformPostsToArticles } from "@/lib/postTransform";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const MostViewedPage = () => {
  const [mostViewArticles, setMostViewArticles] = useState([]);
  const searchText = useStore((state) => state.searchText);
  const { data: postsData, isLoading, error } = useMostViewedPosts();

  useEffect(() => {
    if (postsData?.posts) {
      const articles = transformPostsToArticles(postsData.posts);
      const filtered = filterArticlesByTitle(articles, searchText);
      setMostViewArticles(filtered);
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
          <p className="text-red-500">Error loading most viewed posts</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Most Viewed</h2>
        <BlogPost data={mostViewArticles} />
      </ScrollArea>
    </div>
  );
};

export default MostViewedPage;
