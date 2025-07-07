import { User } from "@/interfaces/auth.interface";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Mail, User as UserIcon, Edit3, BookOpen, Heart } from "lucide-react";

interface ProfileCardProps {
  user: User;
  totalPosts: number;
  totalDrafts: number;
  onLogout: () => void;
}

export const ProfileCard = ({ user, totalPosts, totalDrafts, onLogout }: ProfileCardProps) => {
  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      {/* Avatar Section */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="w-32 h-32">
          <AvatarImage 
            src={`https://robohash.org/${user.email || 'user'}.png?size=128x128&set=set1`}
            alt={`${user.firstName || 'User'} ${user.lastName || ''}`}
          />
          <AvatarFallback className="text-2xl">
            {getInitials(user.firstName || '', user.lastName || '')}
          </AvatarFallback>
        </Avatar>
        <Button variant="outline" className="w-full">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Info */}
      <div className="flex-1 space-y-4">
        <div>
          <h1 className="text-3xl font-bold">
            {user.firstName || 'Anonymous'} {user.lastName || 'User'}
          </h1>
          <p className="text-muted-foreground">Content Creator & Writer</p>
        </div>

        {/* Profile Stats */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <span className="text-sm">
              <strong>{totalPosts}</strong> Published Posts
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-orange-500" />
            <span className="text-sm">
              <strong>{totalDrafts}</strong> Drafts
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm">
              <strong>0</strong> Likes Received
            </span>
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            {user.email || 'No email'}
            {user.isEmailVerified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="w-4 h-4" />
            Joined {formatDate(user.createdAt)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserIcon className="w-4 h-4" />
            User ID: {user._id || 'Unknown'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button onClick={onLogout} variant="outline">
          Sign Out
        </Button>
      </div>
    </div>
  );
};