"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { usePost } from "@/hooks/usePosts";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/loading/LoadingScreen";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ViewArticlePageProps {
  searchParams: {
    id: string;
  };
}

const ViewArticlePage = ({ searchParams }: ViewArticlePageProps) => {
  const router = useRouter();
  const { id } = searchParams;
  const { data: post, isLoading, error } = usePost(id);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !post) {
    return (
      <div className="w-full flex justify-center items-center h-[calc(100vh-52px)]">
        <div className="text-center">
          <p className="text-red-500">Error loading post</p>
          <p className="text-sm text-gray-500">Post not found or failed to load</p>
          <Button onClick={() => router.back()} variant="outline" className="mt-4">
            <MdOutlineArrowBackIosNew />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-[40px]">
      <ScrollArea className="h-[calc(100vh-52px)] w-full">
        <div className="m-auto w-[85vw] md:w-[60vw]">
          <Button onClick={() => router.back()} variant={"link"}>
            <MdOutlineArrowBackIosNew />
            Back
          </Button>

          <section className="px-4">
            <h1 className="my-5 text-4xl font-semibold">{post.title}</h1>
            <div className="mb-5 flex items-center">
              <Avatar className="flex h-14 w-14 items-center">
                <AvatarImage
                  className="inline-block rounded-full bg-black/80"
                  src={`https://robohash.org/${post.author.email}.png?size=50x50&set=set1`}
                  alt={`${post.author.firstName} ${post.author.lastName}`}
                />
                <AvatarFallback>
                  {post.author.firstName[0]}{post.author.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="cursor-pointer hover:underline">
                  {post.author.firstName} {post.author.lastName}
                </p>
                <p className="text-sm">
                  <span className="text-slate-700">Published in DevEnv</span>. 
                  {Math.ceil(post.content.length / 200)} mins read .{" "}
                  {new Date(post.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).replaceAll(".", "/")}
                </p>
              </div>
            </div>

            {post.imageUrl && (
              <div className="mb-6">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="flex flex-col space-y-3 text-lg">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Views: {post.views}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Likes: {post.likes.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Category: {post.category}</span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ViewArticlePage;
