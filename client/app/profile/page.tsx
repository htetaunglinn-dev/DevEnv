"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useMyPosts } from "@/hooks/usePosts";
import { usePostsPage } from "@/hooks/usePostsPage";
import BlogPost from "@/components/custom/BlogPost";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { UserStats } from "@/components/profile/UserStats";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit3, BookOpen, Heart } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("posts");
  
  // Fetch user's posts
  const myPostsQuery = useMyPosts({ status: 'published' });
  const { articles: publishedPosts, isLoading: postsLoading, error: postsError } = usePostsPage(myPostsQuery);
  
  const draftPostsQuery = useMyPosts({ status: 'draft' });
  const { articles: draftPosts, isLoading: draftsLoading, error: draftsError } = usePostsPage(draftPostsQuery);

  if (!user) {
    return (
      <ProtectedRoute>
        <div className="w-full flex justify-center items-center h-[calc(100vh-52px)]">
          <div className="text-center">
            <p className="text-red-500">Unable to load user profile</p>
            <p className="text-sm text-gray-500">Please try refreshing the page</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const totalPosts = publishedPosts.length;
  const totalDrafts = draftPosts.length;

  return (
    <ProtectedRoute>
      <div className="w-full">
        <ScrollArea className="h-[calc(100vh-52px)]">
          <div className="container mx-auto p-6 max-w-6xl">
            {/* Profile Header */}
            <Card className="mb-6">
              <CardContent className="pt-6">
                <ProfileCard 
                  user={user}
                  totalPosts={totalPosts}
                  totalDrafts={totalDrafts}
                  onLogout={logout}
                />
              </CardContent>
            </Card>

            {/* User Stats */}
            <div className="mb-6">
              <UserStats 
                publishedPosts={totalPosts}
                draftPosts={totalDrafts}
                totalLikes={0}
                totalViews={0}
              />
            </div>

            {/* Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="posts">
                  Published Posts ({totalPosts})
                </TabsTrigger>
                <TabsTrigger value="drafts">
                  Drafts ({totalDrafts})
                </TabsTrigger>
                <TabsTrigger value="activity">
                  Activity
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Published Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {postsLoading ? (
                      <div className="text-center py-8">Loading your posts...</div>
                    ) : postsError ? (
                      <div className="text-center py-8 text-red-500">
                        Error loading posts. Please try again.
                      </div>
                    ) : publishedPosts.length > 0 ? (
                      <BlogPost data={publishedPosts} />
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No published posts yet</h3>
                        <p>Start creating content to see your posts here!</p>
                        <Button className="mt-4" onClick={() => window.location.href = '/post-article'}>
                          Create Your First Post
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="drafts" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit3 className="w-5 h-5" />
                      Draft Posts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {draftsLoading ? (
                      <div className="text-center py-8">Loading your drafts...</div>
                    ) : draftsError ? (
                      <div className="text-center py-8 text-red-500">
                        Error loading drafts. Please try again.
                      </div>
                    ) : draftPosts.length > 0 ? (
                      <BlogPost data={draftPosts} />
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Edit3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">No drafts saved</h3>
                        <p>Your draft posts will appear here when you save them.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold mb-2">Activity Feed Coming Soon</h3>
                      <p>Track your likes, comments, and interactions here.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;