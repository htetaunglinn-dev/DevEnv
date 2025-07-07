"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import { usePopularPosts } from "@/hooks/usePosts";
import { transformPostsToArticles } from "@/lib/postTransform";
import BlogPost from "@/components/custom/BlogPost";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ApiTest } from "@/components/debug/ApiTest";
import { TArticle } from "@/interfaces/articles.interface";

const HomePage = () => {
  const [popularArticles, setPopularArticles] = useState<TArticle[]>([]);
  const searchText = useStore((state) => state.searchText);
  const { data: postsData, isLoading, error } = usePopularPosts();

  useEffect(() => {
    console.log("Posts data:", postsData);
    if (postsData?.posts) {
      console.log("Posts array:", postsData.posts);
      const articles = transformPostsToArticles(postsData.posts);
      console.log("Transformed articles:", articles);
      const filtered = filterArticlesByTitle(articles, searchText);
      console.log("Filtered articles:", filtered);
      setPopularArticles(filtered);
    }
  }, [postsData, searchText]);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-52px)] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-52px)] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading popular posts</p>
          <p className="text-sm text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Popular</h2>
        {popularArticles.length === 0 && !isLoading && (
          <div className="p-8 text-center">
            <p className="text-gray-500">No posts found</p>
            <p className="text-sm text-gray-400">
              Debug: Check console for data
            </p>
          </div>
        )}
        <BlogPost data={popularArticles} />
      </ScrollArea>
    </div>
  );
};

export default HomePage;
