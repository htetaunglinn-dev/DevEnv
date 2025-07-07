"use client";

import { usePopularPosts } from "@/hooks/usePosts";
import { usePostsPage } from "@/hooks/usePostsPage";
import BlogPost from "@/components/custom/BlogPost";
import PageWrapper from "@/components/common/PageWrapper";

const HomePage = () => {
  const queryResult = usePopularPosts();
  const { articles, isLoading, error } = usePostsPage(queryResult);

  return (
    <PageWrapper
      isLoading={isLoading}
      error={error}
      title="Popular"
      itemCount={articles.length}
      emptyMessage="No popular posts found"
    >
      <BlogPost data={articles} />
    </PageWrapper>
  );
};

export default HomePage;
