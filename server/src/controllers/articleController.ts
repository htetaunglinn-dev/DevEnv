import { Request, Response } from "express";
import Article, { IArticle } from "../models/Article";
import { AuthenticatedRequest } from "../middleware/auth";
import mongoose from "mongoose";

export const createArticle = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      title,
      content,
      thumbnail,
      shareUrl,
      category,
      tags,
      status = "draft",
    } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const article = new Article({
      title,
      content,
      thumbnail,
      shareUrl,
      category,
      tags: tags || [],
      status,
      author: req.user._id,
    });

    await article.save();
    await article.populate("author", "firstName lastName email");

    res.status(201).json({
      message: "Article created successfully",
      article,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err: any) => err.message),
      });
    }

    console.error("Create article error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticles = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const status = (req.query.status as string) || "published";
    const search = req.query.search as string;
    const author = req.query.author as string;

    const filter: any = { status };

    if (category && category !== "all") {
      filter.category = category;
    }

    if (author) {
      filter.author = author;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const articles = await Article.find(filter)
      .populate("author", "firstName lastName email")
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Article.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalArticles: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get articles error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    const article = await Article.findById(id)
      .populate("author", "firstName lastName email")
      .populate("likes", "firstName lastName");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.status === "published") {
      await article.incrementViews();
    }

    res.json({ article });
  } catch (error) {
    console.error("Get article by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateArticle = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, thumbnail, shareUrl, category, tags, status } =
      req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this article" });
    }

    const updateData: Partial<IArticle> = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;
    if (shareUrl !== undefined) updateData.shareUrl = shareUrl;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (status !== undefined) updateData.status = status;

    const updatedArticle = await Article.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("author", "firstName lastName email");

    res.json({
      message: "Article updated successfully",
      article: updatedArticle,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        errors: Object.values(error.errors).map((err: any) => err.message),
      });
    }

    console.error("Update article error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteArticle = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.author.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this article" });
    }

    await Article.findByIdAndDelete(id);

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Delete article error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const toggleLike = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid article ID" });
    }

    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.status !== "published") {
      return res
        .status(400)
        .json({ message: "Can only like published articles" });
    }

    await article.toggleLike(req.user._id);

    res.json({
      message: "Like toggled successfully",
      likesCount: article.likes.length,
    });
  } catch (error) {
    console.error("Toggle like error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyArticles = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;

    const filter: any = { author: req.user._id };

    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const articles = await Article.find(filter)
      .populate("author", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Article.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      articles,
      pagination: {
        currentPage: page,
        totalPages,
        totalArticles: total,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get my articles error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
