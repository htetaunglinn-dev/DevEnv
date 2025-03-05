"use client";

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bookMarks } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/lib/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";

const BookmarkPage = () => {
  const [bookMarksArticles, setBookMarksArticles] = useState(bookMarks);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(bookMarks, searchText);
    setBookMarksArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="pl-6 pt-5 font-semibold">Bookmark</h2>
        <BlogPost data={bookMarksArticles} />
      </ScrollArea>
    </div>
  );
};

export default BookmarkPage;
