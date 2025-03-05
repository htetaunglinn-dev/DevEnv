"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { technology } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/lib/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";

const TechnologyPage = () => {
  const [technologyArticles, setTechnologyArticles] = useState(technology);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(technology, searchText);
    setTechnologyArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="pl-6 pt-5 font-semibold">Technology</h2>
        <BlogPost data={technologyArticles} />
      </ScrollArea>
    </div>
  );
};

export default TechnologyPage;
