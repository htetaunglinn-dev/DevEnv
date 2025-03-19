"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import { populars } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";

const PopularPage = () => {
  const [popularArticles, setPopularArticles] = useState(populars);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(populars, searchText);
    setPopularArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Popular</h2>
        <BlogPost data={popularArticles} />
      </ScrollArea>
    </div>
  );
};

export default PopularPage;
