"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTechnologyPosts } from "@/hooks/usePosts";
import { transformPostsToArticles } from "@/lib/postTransform";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const TechnologyPage = () => {
  const [technologyArticles, setTechnologyArticles] = useState([]);
  const searchText = useStore((state) => state.searchText);
  const { data: postsData, isLoading, error } = useTechnologyPosts();

  useEffect(() => {
    if (postsData?.posts) {
      const articles = transformPostsToArticles(postsData.posts);
      const filtered = filterArticlesByTitle(articles, searchText);
      setTechnologyArticles(filtered);
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
          <p className="text-red-500">Error loading technology posts</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Technology</h2>
        <BlogPost data={technologyArticles} />
      </ScrollArea>
    </div>
  );
};

export default TechnologyPage;
