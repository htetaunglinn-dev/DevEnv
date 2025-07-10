import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  post: mongoose.Types.ObjectId;
  parent?: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  toggleLike(userId: mongoose.Types.ObjectId): Promise<IComment>;
}

const CommentSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
      minlength: [1, "Comment must be at least 1 character"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Post reference is required"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
CommentSchema.index({ post: 1, createdAt: -1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ parent: 1 });
CommentSchema.index({ post: 1, parent: 1 });

// Method to toggle like
CommentSchema.methods.toggleLike = function (
  this: IComment,
  userId: mongoose.Types.ObjectId
): Promise<IComment> {
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

// Pre-save middleware to update editedAt when comment is modified
CommentSchema.pre("save", function (next) {
  if (this.isModified("content") && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  next();
});

export default mongoose.model<IComment>("Comment", CommentSchema);
