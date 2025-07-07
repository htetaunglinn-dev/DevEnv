"use client";

import { useLatestPosts } from "@/hooks/usePosts";
import { usePostsPage } from "@/hooks/usePostsPage";
import BlogPost from "@/components/custom/BlogPost";
import PageWrapper from "@/components/common/PageWrapper";

const LatestNewsPage = () => {
  const queryResult = useLatestPosts();
  const { articles, isLoading, error } = usePostsPage(queryResult);

  return (
    <PageWrapper
      isLoading={isLoading}
      error={error}
      title="Latest News"
      itemCount={articles.length}
      emptyMessage="No latest news found"
    >
      <BlogPost data={articles} />
    </PageWrapper>
  );
};

export default LatestNewsPage;
