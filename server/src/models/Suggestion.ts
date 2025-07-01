import mongoose, { Document, Schema } from "mongoose";

export interface ISuggestion extends Document {
  _id: string;
  title: string;
  description: string;
  category: "feature" | "improvement" | "bug" | "other";
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-review" | "approved" | "rejected" | "implemented";
  submittedBy: mongoose.Types.ObjectId;
  assignedTo?: mongoose.Types.ObjectId;
  votes: {
    upvotes: mongoose.Types.ObjectId[];
    downvotes: mongoose.Types.ObjectId[];
  };
  comments: {
    user: mongoose.Types.ObjectId;
    message: string;
    createdAt: Date;
  }[];
  tags: string[];
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const suggestionSchema = new Schema<ISuggestion>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["feature", "improvement", "bug", "other"],
      default: "other",
    },
    priority: {
      type: String,
      required: [true, "Priority is required"],
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["pending", "in-review", "approved", "rejected", "implemented"],
      default: "pending",
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Submitted by user is required"],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    votes: {
      upvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
      downvotes: [{
        type: Schema.Types.ObjectId,
        ref: "User",
      }],
    },
    comments: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Comment cannot exceed 500 characters"],
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    tags: [{
      type: String,
      trim: true,
      lowercase: true,
      maxlength: [30, "Tag cannot exceed 30 characters"],
    }],
    attachments: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
suggestionSchema.index({ submittedBy: 1, createdAt: -1 });
suggestionSchema.index({ status: 1, priority: -1 });
suggestionSchema.index({ category: 1, createdAt: -1 });
suggestionSchema.index({ tags: 1 });

// Virtual for vote count
suggestionSchema.virtual("voteCount").get(function () {
  return this.votes.upvotes.length - this.votes.downvotes.length;
});

// Virtual for total votes
suggestionSchema.virtual("totalVotes").get(function () {
  return this.votes.upvotes.length + this.votes.downvotes.length;
});

// Ensure virtual fields are serialized
suggestionSchema.set("toJSON", { virtuals: true });
suggestionSchema.set("toObject", { virtuals: true });

export default mongoose.model<ISuggestion>("Suggestion", suggestionSchema);