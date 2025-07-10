import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatTitle } from "@/utils/formatTitle";
import PostEngagement from "../ui/PostEngagement";

interface blogPostProps {
  id: number;
  mongoId?: string;
  avatar: string;
  title: string;
  time_stamp: string;
  img: StaticImageData | string;
  likes?: string[];
  views?: number;
  commentsCount?: number;
}

interface dataProps {
  data: blogPostProps[];
}

const BlogPost = ({ data }: dataProps) => {
  return (
    <div className="3xl:grid-cols-5 grid gap-6 p-10 pt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/view-article?id=${item.mongoId || item.id}`}
        >
          <Card className="cursor-pointer bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10">
            <CardHeader>
              <Avatar className="mb-5 h-8 w-8">
                <AvatarImage
                  className="inline-block rounded-lg"
                  src={item.avatar}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="h-[84px]">
                <h2 className="text-lg font-semibold dark:text-white/60">
                  {formatTitle(item.title)}
                </h2>
              </div>
            </CardHeader>
            <CardContent>
              <span className="text-xs text-slate-600 dark:text-white/60">
                {item.time_stamp}
              </span>
              <div className="relative mt-4 h-[200px] w-full rounded-md">
                <Image
                  loading="lazy"
                  className="rounded-md object-cover object-center"
                  fill
                  src={item.img}
                  alt="article thumbnail"
                  unoptimized={typeof item.img === "string"}
                />
              </div>

              {/* Engagement Metrics */}
              {item.mongoId && (
                <div
                  className="mt-4 border-t border-gray-200 pt-3 dark:border-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <PostEngagement
                    postId={item.mongoId}
                    likes={item.likes || []}
                    views={item.views || 0}
                    commentsCount={item.commentsCount || 0}
                    size="sm"
                    layout="horizontal"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogPost;
