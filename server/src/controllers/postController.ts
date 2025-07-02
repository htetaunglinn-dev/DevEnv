import { Request, Response } from "express";
import Post from "../models/Post";
import { AuthenticatedRequest } from "../middleware/auth";

export const createPost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, content, imageUrl, category, tags, status } = req.body;

    const post = new Post({
      title,
      content,
      imageUrl,
      author: req.user?._id,
      category,
      tags: tags ? tags.split(",").map((tag: string) => tag.trim()) : [],
      status: status || "draft",
    });

    await post.save();
    await post.populate("author", "firstName lastName email");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error: any) {
    console.error("Error creating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const category = req.query.category as string;
    const status = (req.query.status as string) || "published";
    const search = req.query.search as string;
    const tags = req.query.tags as string;

    let query: any = { status };

    if (category && category !== "all") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (tags) {
      const tagArray = tags.split(",").map((tag) => tag.trim());
      query.tags = { $in: tagArray };
    }

    const posts = await Post.find(query)
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

export const getPostById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "author",
      "firstName lastName email"
    );

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    if (req.user) {
      await post.incrementViews();
    }

    res.json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error("Error fetching post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch post",
      error: error.message,
    });
  }
};

export const updatePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, content, imageUrl, category, tags, status } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    if (post.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this post",
      });
      return;
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        content,
        imageUrl,
        category,
        tags: tags
          ? tags.split(",").map((tag: string) => tag.trim())
          : post.tags,
        status,
      },
      { new: true, runValidators: true }
    ).populate("author", "firstName lastName email");

    res.json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error: any) {
    console.error("Error updating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    if (post.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({
        success: false,
        message: "Not authorized to delete this post",
      });
      return;
    }

    await Post.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete post",
      error: error.message,
    });
  }
};

export const toggleLike = async (
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

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });
      return;
    }

    await post.toggleLike(userId);

    res.json({
      success: true,
      message: "Post like toggled successfully",
      data: {
        likesCount: post.likes.length,
        isLiked: post.likes.includes(userId),
      },
    });
  } catch (error: any) {
    console.error("Error toggling post like:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle post like",
      error: error.message,
    });
  }
};

export const getMyPosts = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const status = req.query.status as string;

    let query: any = { author: req.user?._id };

    if (status) {
      query.status = status;
    }

    const posts = await Post.find(query)
      .populate("author", "firstName lastName")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Post.countDocuments(query);

    res.json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error: any) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user posts",
      error: error.message,
    });
  }
};
