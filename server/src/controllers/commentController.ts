import { Request, Response } from "express";
import Comment from "../models/Comment";
import Post from "../models/Post";
import { AuthenticatedRequest } from "../middleware/auth";

export const createComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { content, postId, parentId } = req.body;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    // If parentId is provided, check if parent comment exists
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
        return;
      }
    }

    const comment = new Comment({
      content,
      author: req.user?._id,
      post: postId,
      parent: parentId || null,
    });

    await comment.save();
    await comment.populate("author", "firstName lastName");

    // Increment post's comments count
    await post.incrementCommentsCount();

    res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: comment,
    });
  } catch (error: any) {
    console.error("Error creating comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create comment",
      error: error.message,
    });
  }
};

export const getComments = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Check if post exists
    const post = await Post.findById(postId);
    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    // Get top-level comments (no parent)
    const comments = await Comment.find({ post: postId, parent: null })
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await Comment.find({ parent: comment._id })
          .populate("author", "firstName lastName")
          .sort({ createdAt: 1 });
        
        // Add likesCount to each reply
        const repliesWithLikes = replies.map(reply => ({
          ...reply.toObject(),
          likesCount: reply.likes.length,
        }));
        
        return {
          ...comment.toObject(),
          replies: repliesWithLikes,
          repliesCount: replies.length,
          likesCount: comment.likes.length,
        };
      })
    );

    const total = await Comment.countDocuments({ post: postId, parent: null });

    res.json({
      success: true,
      data: commentsWithReplies,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching comments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};

export const updateComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
      return;
    }

    // Only allow author to update comment
    if (comment.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this comment",
      });
      return;
    }

    // Check if comment is older than 24 hours
    const commentAge = Date.now() - comment.createdAt.getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (commentAge > twentyFourHours) {
      res.status(400).json({
        success: false,
        message: "Comments can only be edited within 24 hours of creation",
      });
      return;
    }

    comment.content = content;
    await comment.save();
    await comment.populate("author", "firstName lastName");

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error: any) {
    console.error("Error updating comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update comment",
      error: error.message,
    });
  }
};

export const deleteComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
      return;
    }

    // Allow author or admin to delete comment
    if (
      comment.author.toString() !== req.user?._id.toString() &&
      req.user?.role !== "admin"
    ) {
      res.status(403).json({
        success: false,
        message: "Not authorized to delete this comment",
      });
      return;
    }

    // Count replies to decrement from post count
    const repliesCount = await Comment.countDocuments({ parent: id });

    // Delete all replies to this comment
    await Comment.deleteMany({ parent: id });

    // Delete the comment
    await Comment.findByIdAndDelete(id);

    // Decrement post's comments count (main comment + all replies)
    const post = await Post.findById(comment.post);
    if (post) {
      for (let i = 0; i <= repliesCount; i++) {
        await post.decrementCommentsCount();
      }
    }

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting comment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment",
      error: error.message,
    });
  }
};

export const toggleCommentLike = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
      return;
    }

    await comment.toggleLike(userId);

    res.json({
      success: true,
      message: "Comment like toggled successfully",
      data: {
        likesCount: comment.likes.length,
        isLiked: comment.likes.includes(userId),
      },
    });
  } catch (error: any) {
    console.error("Error toggling comment like:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle comment like",
      error: error.message,
    });
  }
};

export const getCommentReplies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const comment = await Comment.findById(id);

    if (!comment) {
      res.status(404).json({
        success: false,
        message: "Comment not found",
      });
      return;
    }

    const replies = await Comment.find({ parent: id })
      .populate("author", "firstName lastName")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Comment.countDocuments({ parent: id });

    const repliesWithLikes = replies.map((reply) => ({
      ...reply.toObject(),
      likesCount: reply.likes.length,
    }));

    res.json({
      success: true,
      data: repliesWithLikes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching comment replies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comment replies",
      error: error.message,
    });
  }
};
