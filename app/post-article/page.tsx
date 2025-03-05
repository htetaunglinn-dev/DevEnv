"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RiDragDropLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const PostArticlePage = () => {
  const [showUpload, setShowUpload] = useState(true);

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageView = document.getElementById("img-label") as HTMLDivElement;
    //avoiding null value
    if (!e.target.files) return;

    let file = e.target.files[0];
    let imgLink = URL.createObjectURL(file);
    imageView.style.backgroundImage = `url(${imgLink})`;
    setShowUpload(false);
  };

  const clearBgImage = () => {
    const imageView = document.getElementById("img-label") as HTMLDivElement;
    imageView.style.backgroundImage = "";
    setShowUpload(true);
  };

  return (
    <div className="w-full ">
      <ScrollArea className="w-full">
        <div className="flex h-[calc(100vh-52px)] items-center justify-center">
          <Tabs defaultValue="create" className="w-[80%] md:w-[60%]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create a post</TabsTrigger>
              <TabsTrigger value="share">Share a post</TabsTrigger>
            </TabsList>
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle>Create a post</CardTitle>
                  <CardDescription>
                    What would you like to post?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 ">
                  <div className="relative w-fit space-y-1">
                    <Label
                      id="img-label"
                      className={`relative flex h-[140px] w-[200px] cursor-pointer items-center justify-center rounded-2xl border bg-cover bg-center bg-no-repeat`}
                      htmlFor="thumbnail"
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          showUpload ? "" : "pointer-events-none hidden"
                        }`}
                      >
                        <Input
                          onChange={uploadImage}
                          disabled={!showUpload}
                          className="hidden"
                          type="file"
                          id="thumbnail"
                        />
                        <RiDragDropLine className="inline-block" size={20} />
                        <p className="inline-block"> Upload Thumbnail </p>
                      </div>
                    </Label>
                    {showUpload ? null : (
                      <Button
                        onClick={clearBgImage}
                        className="absolute -right-3 -top-3 z-10 h-[30px] w-[30px] rounded-full bg-gray-50/10 p-0 text-black drop-shadow backdrop:blur-md hover:bg-gray-300/20 dark:text-white"
                      >
                        <RxCross2 />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="post-title">Post Title</Label>
                    <Input
                      id="post-title"
                      placeholder="Enter your post title"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="paragraph">Share your content</Label>
                    <Textarea
                      id="paragraph"
                      rows={4}
                      placeholder="Enter your post content"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Create post</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="share">
              <Card>
                <CardHeader>
                  <CardTitle>Share a post</CardTitle>
                  <CardDescription>
                    What would you like to share?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="post-title">Post URL</Label>
                    <Input
                      type="url"
                      id="post-title"
                      placeholder="Enter your post url"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="paragraph">Share your content</Label>
                    <Textarea
                      id="paragraph"
                      rows={11}
                      placeholder="Enter your post content"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Share post</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  );
};

export default PostArticlePage;
