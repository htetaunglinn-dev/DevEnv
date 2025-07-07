import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { transformPostsToArticles } from "@/lib/postTransform";
import { filterArticlesByTitle } from "@/utils/filterArticlesByTitle";
import { TArticle } from "@/interfaces/articles.interface";
import { UseQueryResult } from "@tanstack/react-query";

interface PostsQueryData {
  posts: any[];
  pagination: any;
}

export const usePostsPage = (queryResult: UseQueryResult<PostsQueryData, Error>) => {
  const [articles, setArticles] = useState<TArticle[]>([]);
  const searchText = useStore((state) => state.searchText);
  const { data: postsData, isLoading, error } = queryResult;

  useEffect(() => {
    if (postsData?.posts) {
      const transformedArticles = transformPostsToArticles(postsData.posts);
      const filtered = filterArticlesByTitle(transformedArticles, searchText);
      setArticles(filtered);
    }
  }, [postsData, searchText]);

  return {
    articles,
    isLoading,
    error,
  };
};