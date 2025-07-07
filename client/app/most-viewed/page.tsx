"use client";

import { useMostViewedPosts } from "@/hooks/usePosts";
import { usePostsPage } from "@/hooks/usePostsPage";
import BlogPost from "@/components/custom/BlogPost";
import PageWrapper from "@/components/common/PageWrapper";

const MostViewedPage = () => {
  const queryResult = useMostViewedPosts();
  const { articles, isLoading, error } = usePostsPage(queryResult);

  return (
    <PageWrapper
      isLoading={isLoading}
      error={error}
      title="Most Viewed"
      itemCount={articles.length}
      emptyMessage="No posts found"
    >
      <BlogPost data={articles} />
    </PageWrapper>
  );
};

export default MostViewedPage;
