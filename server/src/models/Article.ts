import mongoose, { Document, Schema } from "mongoose";

export interface IArticle extends Document {
  title: string;
  content: string;
  thumbnail?: string;
  shareUrl?: string;
  author: mongoose.Types.ObjectId;
  category:
    | "technology"
    | "business"
    | "lifestyle"
    | "tutorial"
    | "news"
    | "other";
  tags: string[];
  status: "draft" | "published" | "archived";
  views: number;
  likes: mongoose.Types.ObjectId[];
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  incrementViews(): Promise<IArticle>;
  toggleLike(userId: mongoose.Types.ObjectId): Promise<IArticle>;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, "Article title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    content: {
      type: String,
      required: [true, "Article content is required"],
      minlength: [10, "Content must be at least 10 characters long"],
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    shareUrl: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true;
          const urlPattern = /^https?:\/\/.+/;
          return urlPattern.test(v);
        },
        message: "Share URL must be a valid URL",
      },
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    category: {
      type: String,
      enum: {
        values: [
          "technology",
          "business",
          "lifestyle",
          "tutorial",
          "news",
          "other",
        ],
        message:
          "Category must be one of: technology, business, lifestyle, tutorial, news, other",
      },
      default: "other",
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: [50, "Tag cannot exceed 50 characters"],
      },
    ],
    status: {
      type: String,
      enum: {
        values: ["draft", "published", "archived"],
        message: "Status must be one of: draft, published, archived",
      },
      default: "draft",
    },
    views: {
      type: Number,
      default: 0,
      min: [0, "Views cannot be negative"],
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.index({ author: 1, createdAt: -1 });
ArticleSchema.index({ status: 1, publishedAt: -1 });
ArticleSchema.index({ category: 1, status: 1 });
ArticleSchema.index({ tags: 1 });

ArticleSchema.pre("save", function (next) {
  if (this.status === "published" && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

ArticleSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

ArticleSchema.methods.toggleLike = function (userId: mongoose.Types.ObjectId) {
  const likeIndex = this.likes.findIndex(
    (id: mongoose.Types.ObjectId) => id.toString() === userId.toString()
  );

  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push(userId);
  }

  return this.save();
};

export default mongoose.model<IArticle>("Article", ArticleSchema);
