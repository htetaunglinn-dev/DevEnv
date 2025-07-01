"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { bestAuthors } from "@/data/articles";
import BlogPost from "@/components/custom/BlogPost";
import { useStore } from "@/store/store";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";

const MostViewedPage = () => {
  const [bestAuthorArticles, setBestAuthorArticles] = useState(bestAuthors);
  const searchText = useStore((state) => state.searchText);

  useEffect(() => {
    const filtered = filterArticlesByTitle(bestAuthors, searchText);
    setBestAuthorArticles(filtered);
  }, [searchText]);

  return (
    <div className="w-full">
      <ScrollArea className="h-[calc(100vh-52px)]">
        <h2 className="page-header">Best Authors</h2>
        <BlogPost data={bestAuthorArticles} />
      </ScrollArea>
    </div>
  );
};

export default MostViewedPage;
