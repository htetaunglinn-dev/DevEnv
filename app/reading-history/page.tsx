"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { readingHistories } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";

const ReadingHistoryPage = () => {
  const [readingHistoriesArticles, setReadingHistoriesArticles] =
    useState(readingHistories);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(readingHistories, searchText);
    setReadingHistoriesArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Reading History</h2>
        <BlogPost data={readingHistoriesArticles} />
      </ScrollArea>
    </div>
  );
};

export default ReadingHistoryPage;
