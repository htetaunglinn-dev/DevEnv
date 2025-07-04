"use client";

import React from "react";

import { useRouter } from "next/navigation";

import { articles } from "@/data/articles";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

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
  const article = articles.find((article) => article.id === Number(id));

  return (
    <div className="w-full p-[40px]">
      <ScrollArea className="h-[calc(100vh-52px)] w-full">
        <div className="m-auto w-[85vw] md:w-[60vw]">
          <Button onClick={() => router.back()} variant={"link"}>
            <MdOutlineArrowBackIosNew />
            Back
          </Button>

          <section className="px-4">
            <h1 className="my-5 text-4xl font-semibold">{article?.title}</h1>
            <div className="mb-5 flex items-center">
              <Avatar className="flex h-14 w-14 items-center">
                <AvatarImage
                  className="inline-block rounded-full bg-black/80"
                  src={article?.avatar}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="cursor-pointer hover:underline">Htet Aung Linn</p>
                <p className="text-sm">
                  <span className="text-slate-700">Published in DevEnv</span>. 4
                  mins read .{" "}
                  {article?.time_stamp.replaceAll(".", "/") as string}
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 text-lg">
              <p>
                This is the first of a series of articles that will walk you
                through the process of creating a full-stack web application
                using Angular, .NET, and GraphQL with the SQL server as a
                database.
              </p>
              <p>
                We will create a MovieApp project. The app will display a list
                of movies and their details, such as rating, genre, description,
                poster image, and language. It will allow us to filter the
                movies based on the genre.
              </p>
              <p>
                The app will have support for authentication and authorization.
                It will support two roles—admin and user. An admin can add,
                update, and delete movie data in the application. A user has
                only read access but can add a movie to a watchlist.
              </p>
              <p>
                We will then learn to deploy the app to IIS and Azure app
                services.
              </p>
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ViewArticlePage;
