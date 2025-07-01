"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { latestNews } from "@/data/articles";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import BlogPost from "@/components/custom/BlogPost";

const LatestNewsPage = () => {
  const [latestNewsArticles, setLatestNewsArticles] = useState(latestNews);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(latestNews, searchText);
    setLatestNewsArticles(filtered);
  }, [searchText]);

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
