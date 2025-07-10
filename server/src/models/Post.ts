import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  imageUrl?: string;
  author: mongoose.Types.ObjectId;
  category:
    | "general"
    | "news"
    | "tutorial"
    | "lifestyle"
    | "technology"
    | "other";
  tags: string[];
  status: "draft" | "published" | "archived";
  views: number;
  likes: mongoose.Types.ObjectId[];
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
  incrementViews(): Promise<IPost>;
  toggleLike(userId: mongoose.Types.ObjectId): Promise<IPost>;
  incrementCommentsCount(): Promise<IPost>;
  decrementCommentsCount(): Promise<IPost>;
}

const PostSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          return /^https?:\/\/.+/.test(v);
        },
        message: "Image URL must be a valid URL",
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      enum: ["general", "news", "tutorial", "lifestyle", "technology", "other"],
      default: "general",
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentsCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ author: 1, status: 1 });
PostSchema.index({ category: 1, status: 1 });
PostSchema.index({ tags: 1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ title: "text", content: "text" });

PostSchema.methods.incrementViews = function (this: IPost): Promise<IPost> {
  this.views += 1;
  return this.save();
};

PostSchema.methods.toggleLike = function (
  this: IPost,
  userId: mongoose.Types.ObjectId
): Promise<IPost> {
  const userIdString = userId.toString();
  const likeIndex = this.likes.findIndex(
    (id) => id.toString() === userIdString
  );

  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }

  return this.save();
};

PostSchema.methods.incrementCommentsCount = function (
  this: IPost
): Promise<IPost> {
  this.commentsCount += 1;
  return this.save();
};

PostSchema.methods.decrementCommentsCount = function (
  this: IPost
): Promise<IPost> {
  if (this.commentsCount > 0) {
    this.commentsCount -= 1;
  }
  return this.save();
};

export default mongoose.model<IPost>("Post", PostSchema);
