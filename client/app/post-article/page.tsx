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
import { useForm, SubmitHandler } from "react-hook-form";
import { ICreatePost } from "@/interfaces/createPost.interface";
import { PostTypes } from "@/constants/postType.enum";

const PostArticlePage = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(PostTypes.CREATE);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
    clearErrors,
    setError,
    reset,
  } = useForm<ICreatePost>();

  const onSubmit: SubmitHandler<ICreatePost> = (data) => {
    if (activeTab === PostTypes.CREATE) {
      if (previewImage) {
        clearErrors("thumbnail");
        console.log("Create Post Data:", data);
      } else {
        setError("thumbnail", {
          type: "required",
          message: "Thumbnail is required",
        });
        return;
      }
    } else {
      console.log("Share Post Data:", {
        shareUrl: data.shareUrl,
        postContent: data.postContent,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgLink = URL.createObjectURL(file);
      setPreviewImage(imgLink);
      setValue("thumbnail", file);
      clearErrors("thumbnail");
    }
  };

  const clearImage = () => {
    setPreviewImage(null);
    resetField("thumbnail");
  };

  const handleActiveTab = (value: string) => {
    clearImage();
    reset();
    setActiveTab(value);
  };

  return (
    <div className="w-full">
      <ScrollArea className="w-full">
        <form
          className="flex h-[calc(100vh-52px)] items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Tabs
            defaultValue={PostTypes.CREATE}
            className="w-[80%] md:w-[60%]"
            onValueChange={(value) => handleActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={PostTypes.CREATE}>Create a post</TabsTrigger>
              <TabsTrigger value={PostTypes.SHARE}>Share a post</TabsTrigger>
            </TabsList>
            <TabsContent value={PostTypes.CREATE}>
              {activeTab === PostTypes.CREATE && (
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
                        className={`relative flex h-[140px] w-[200px] cursor-pointer items-center justify-center rounded-2xl border bg-cover bg-center bg-no-repeat ${
                          previewImage ? "" : "bg-gray-100 dark:bg-gray-800"
                        }`}
                        htmlFor="thumbnail"
                        style={{
                          backgroundImage: previewImage
                            ? `url(${previewImage})`
                            : undefined,
                        }}
                      >
                        {!previewImage && (
                          <div className="flex items-center gap-2">
                            <RiDragDropLine
                              className="inline-block"
                              size={20}
                            />
                            <p className="inline-block"> Upload Thumbnail </p>
                          </div>
                        )}
                      </Label>
                      <Input
                        {...register("thumbnail")}
                        onChange={handleImageChange}
                        className="hidden"
                        type="file"
                        id="thumbnail"
                        accept="image/*"
                      />
                      {previewImage && (
                        <Button
                          onClick={clearImage}
                          className="absolute -right-3 -top-3 z-10 h-[30px] w-[30px] rounded-full bg-gray-50/10 p-0 text-black drop-shadow backdrop:blur-md hover:bg-gray-300/20 dark:text-white"
                        >
                          <RxCross2 />
                        </Button>
                      )}
                      {errors.thumbnail && !previewImage && (
                        <span className="mt-2 inline-block text-red-500">
                          Thumbnail is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="post-title">Post Title</Label>
                      <Input
                        {...register("postTitle", { required: true })}
                        id="post-title"
                        placeholder="Enter your post title"
                      />
                      {errors.postTitle && (
                        <span className="mt-2 inline-block text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="paragraph">Share your content</Label>
                      <Textarea
                        {...register("postContent", { required: true })}
                        id="paragraph"
                        rows={4}
                        placeholder="Enter your post content"
                      />
                      {errors.postContent && (
                        <span className="mt-2 inline-block text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Create post</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            <TabsContent value={PostTypes.SHARE}>
              {activeTab === PostTypes.SHARE && (
                <Card>
                  <CardHeader>
                    <CardTitle>Share a post</CardTitle>
                    <CardDescription>
                      What would you like to share?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="share-url">Post URL</Label>
                      <Input
                        {...register("shareUrl", { required: true })}
                        type="url"
                        id="share-url"
                        placeholder="Enter your post url"
                      />
                      {errors.shareUrl && (
                        <span className="mt-2 inline-block text-red-500">
                          URL is required
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="share-content">Share your content</Label>
                      <Textarea
                        {...register("postContent", { required: true })}
                        id="share-content"
                        rows={11}
                        placeholder="Enter your post content"
                      />
                      {errors.postContent && (
                        <span className="mt-2 inline-block text-red-500">
                          This field is required
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Share post</Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </form>
      </ScrollArea>
    </div>
  );
};

export default PostArticlePage;
