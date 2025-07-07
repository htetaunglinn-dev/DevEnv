"use client";

import { useTechnologyPosts } from "@/hooks/usePosts";
import { usePostsPage } from "@/hooks/usePostsPage";
import BlogPost from "@/components/custom/BlogPost";
import PageWrapper from "@/components/common/PageWrapper";

const TechnologyPage = () => {
  const queryResult = useTechnologyPosts();
  const { articles, isLoading, error } = usePostsPage(queryResult);

  return (
    <PageWrapper
      isLoading={isLoading}
      error={error}
      title="Technology"
      itemCount={articles.length}
      emptyMessage="No technology posts found"
    >
      <BlogPost data={articles} />
    </PageWrapper>
  );
};

export default TechnologyPage;
