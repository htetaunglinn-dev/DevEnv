"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mostViews } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/lib/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";

const MostViewedPage = () => {
  const [mostViewArticles, setMostViewArticles] = useState(mostViews);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(mostViews, searchText);
    setMostViewArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="pl-6 pt-5 font-semibold">Most Viewed</h2>
        <BlogPost data={mostViewArticles} />
      </ScrollArea>
    </div>
  );
};

export default MostViewedPage;
