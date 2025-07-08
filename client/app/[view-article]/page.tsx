"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";

import { usePost } from "@/hooks/usePosts";
import { deletePost } from "@/lib/postApi";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/ui/toast";
import LoadingScreen from "@/components/loading/LoadingScreen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AdminPostEdit from "@/components/admin/AdminPostEdit";
import { useAuth } from "@/contexts/AuthContext";

import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiMoreVertical } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface ViewArticlePageProps {
  searchParams: {
    id: string;
  };
}

const ViewArticlePage = ({ searchParams }: ViewArticlePageProps) => {
  const router = useRouter();
  const { id } = searchParams;
  const { data: post, isLoading, error, refetch } = usePost(id);
  const { user } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast, toasts, removeToast } = useToast();

  const isAdmin = user?.role === "admin";
  const isAuthor = user?._id === post?.author._id;
  const canDelete = isAdmin || isAuthor;

  const handleDelete = async () => {
    try {
      await deletePost(id);
      setDeleteDialogOpen(false);
      toast({
        title: "Success",
        description: "Post deleted successfully",
        type: "success",
      });
      router.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast({
        title: "Error",
        description: "Failed to delete post. Please try again.",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !post) {
    return (
      <div className="flex h-[calc(100vh-52px)] w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-500">Error loading post</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Post not found or failed to load
          </p>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="mt-4"
          >
            <MdOutlineArrowBackIosNew />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <ScrollArea className="h-[calc(100vh-52px)] w-full">
        <div className="m-auto w-[85vw] py-4 md:w-[60vw]">
          <Button onClick={() => router.back()} variant={"link"}>
            <MdOutlineArrowBackIosNew />
            Back
          </Button>

          <section className="px-4">
            <div className="flex items-center justify-between">
              <h1 className="my-5 text-4xl font-semibold">{post.title}</h1>
              {(isAdmin || canDelete) && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FiMoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
                        <FiEdit className="mr-2 h-4 w-4" />
                        Edit Post
                      </DropdownMenuItem>
                    )}
                    {canDelete && (
                      <DropdownMenuItem
                        onClick={() => setDeleteDialogOpen(true)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <FiTrash2 className="mr-2 h-4 w-4" />
                        Delete Post
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="mb-5 flex items-center">
              <Avatar className="flex h-14 w-14 items-center">
                <AvatarImage
                  className="inline-block rounded-full bg-black/80"
                  src={`https://robohash.org/${post.author.email}.png?size=50x50&set=set1`}
                  alt={`${post.author.firstName || "User"} ${post.author.lastName || ""}`}
                />
                <AvatarFallback>
                  {post.author.firstName?.[0] || "U"}
                  {post.author.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="cursor-pointer hover:underline">
                  {post.author.firstName || "Anonymous"}{" "}
                  {post.author.lastName || "User"}
                </p>
                <p className="text-sm">
                  <span className="text-slate-700 dark:text-slate-300">
                    Published in DevEnv.{" "}
                  </span>
                  {Math.ceil(post.content.length / 200)} mins read .{" "}
                  {new Date(post.createdAt)
                    .toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replaceAll(".", "/")}
                </p>
              </div>
            </div>

            {post.imageUrl && (
              <div className="mb-6">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-auto w-full rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="flex flex-col space-y-3 text-lg">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Views: {post.views}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Likes: {post.likes.length}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Category: {post.category}
                </span>
              </div>
            </div>

            {post.tags.length > 0 && (
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-2 py-1 text-sm dark:bg-gray-800"
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

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
          {editDialogOpen && (
            <AdminPostEdit
              post={post}
              onSave={() => {
                setEditDialogOpen(false);
                refetch();
              }}
              onCancel={() => setEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post? This action cannot be
              undone.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewArticlePage;
