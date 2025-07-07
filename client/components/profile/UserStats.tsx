import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Edit3, Heart, Eye } from "lucide-react";

interface UserStatsProps {
  publishedPosts: number;
  draftPosts: number;
  totalLikes?: number;
  totalViews?: number;
}

export const UserStats = ({ 
  publishedPosts, 
  draftPosts, 
  totalLikes = 0, 
  totalViews = 0 
}: UserStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{publishedPosts}</p>
              <p className="text-xs text-muted-foreground">Published Posts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{draftPosts}</p>
              <p className="text-xs text-muted-foreground">Draft Posts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{totalLikes}</p>
              <p className="text-xs text-muted-foreground">Total Likes</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{totalViews}</p>
              <p className="text-xs text-muted-foreground">Total Views</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};