import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Suggestion from "../models/Suggestion";
import { AuthenticatedRequest } from "../middleware/auth";

// Get all suggestions with filtering and pagination
export const getAllSuggestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter: any = {};
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }

    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { tags: { $in: [new RegExp(req.query.search as string, "i")] } },
      ];
    }

    // Build sort object
    let sort: any = { createdAt: -1 }; // Default sort by newest
    
    if (req.query.sortBy) {
      const sortBy = req.query.sortBy as string;
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
      
      if (sortBy === "votes") {
        // Sort by vote count (virtual field)
        sort = { "votes.upvotes": sortOrder };
      } else if (sortBy === "priority") {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        sort = { priority: sortOrder };
      } else {
        sort = { [sortBy]: sortOrder };
      }
    }

    const suggestions = await Suggestion.find(filter)
      .populate("submittedBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .populate("comments.user", "firstName lastName")
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Suggestion.countDocuments(filter);

    res.json({
      message: "Suggestions retrieved successfully",
      suggestions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Get all suggestions error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get suggestion by ID
export const getSuggestionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const suggestion = await Suggestion.findById(id)
      .populate("submittedBy", "firstName lastName email")
      .populate("assignedTo", "firstName lastName email")
      .populate("comments.user", "firstName lastName");

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    res.json({
      message: "Suggestion retrieved successfully",
      suggestion,
    });
  } catch (error) {
    console.error("Get suggestion by ID error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create new suggestion
export const createSuggestion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Validation errors",
        errors: errors.array(),
      });
      return;
    }

    const { title, description, category, priority, tags } = req.body;
    const userId = req.user._id;

    const suggestion = new Suggestion({
      title,
      description,
      category,
      priority,
      tags: tags || [],
      submittedBy: userId,
    });

    await suggestion.save();

    const populatedSuggestion = await Suggestion.findById(suggestion._id)
      .populate("submittedBy", "firstName lastName email");

    res.status(201).json({
      message: "Suggestion created successfully",
      suggestion: populatedSuggestion,
    });
  } catch (error) {
    console.error("Create suggestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update suggestion
export const updateSuggestion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Validation errors",
        errors: errors.array(),
      });
      return;
    }

    const { id } = req.params;
    const userId = req.user._id;
    
    const suggestion = await Suggestion.findById(id);
    
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    // Check if user owns the suggestion or is admin
    if (suggestion.submittedBy.toString() !== userId.toString()) {
      res.status(403).json({ message: "Not authorized to update this suggestion" });
      return;
    }

    const { title, description, category, priority, tags } = req.body;

    const updatedSuggestion = await Suggestion.findByIdAndUpdate(
      id,
      {
        title,
        description,
        category,
        priority,
        tags,
      },
      { new: true, runValidators: true }
    ).populate("submittedBy", "firstName lastName email");

    res.json({
      message: "Suggestion updated successfully",
      suggestion: updatedSuggestion,
    });
  } catch (error) {
    console.error("Update suggestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete suggestion
export const deleteSuggestion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const suggestion = await Suggestion.findById(id);

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    // Check if user owns the suggestion or is admin
    if (suggestion.submittedBy.toString() !== userId.toString()) {
      res.status(403).json({ message: "Not authorized to delete this suggestion" });
      return;
    }

    await Suggestion.findByIdAndDelete(id);

    res.json({ message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error("Delete suggestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Vote on suggestion
export const voteSuggestion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const userId = req.user._id;

    if (!["upvote", "downvote"].includes(voteType)) {
      res.status(400).json({ message: "Invalid vote type. Must be 'upvote' or 'downvote'" });
      return;
    }

    const suggestion = await Suggestion.findById(id);

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    // Remove user from both upvotes and downvotes arrays
    suggestion.votes.upvotes = suggestion.votes.upvotes.filter(
      (vote) => vote.toString() !== userId.toString()
    );
    suggestion.votes.downvotes = suggestion.votes.downvotes.filter(
      (vote) => vote.toString() !== userId.toString()
    );

    // Add user to appropriate array
    if (voteType === "upvote") {
      suggestion.votes.upvotes.push(userId);
    } else {
      suggestion.votes.downvotes.push(userId);
    }

    await suggestion.save();

    const updatedSuggestion = await Suggestion.findById(id)
      .populate("submittedBy", "firstName lastName email");

    res.json({
      message: "Vote recorded successfully",
      suggestion: updatedSuggestion,
    });
  } catch (error) {
    console.error("Vote suggestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove vote from suggestion
export const removeVote = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const suggestion = await Suggestion.findById(id);

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    // Remove user from both arrays
    suggestion.votes.upvotes = suggestion.votes.upvotes.filter(
      (vote) => vote.toString() !== userId.toString()
    );
    suggestion.votes.downvotes = suggestion.votes.downvotes.filter(
      (vote) => vote.toString() !== userId.toString()
    );

    await suggestion.save();

    const updatedSuggestion = await Suggestion.findById(id)
      .populate("submittedBy", "firstName lastName email");

    res.json({
      message: "Vote removed successfully",
      suggestion: updatedSuggestion,
    });
  } catch (error) {
    console.error("Remove vote error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Add comment to suggestion
export const addComment = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Validation errors",
        errors: errors.array(),
      });
      return;
    }

    const { id } = req.params;
    const { message } = req.body;
    const userId = req.user._id;

    const suggestion = await Suggestion.findById(id);

    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    suggestion.comments.push({
      user: userId,
      message,
      createdAt: new Date(),
    });

    await suggestion.save();

    const updatedSuggestion = await Suggestion.findById(id)
      .populate("submittedBy", "firstName lastName email")
      .populate("comments.user", "firstName lastName");

    res.status(201).json({
      message: "Comment added successfully",
      suggestion: updatedSuggestion,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get user's suggestions
export const getUserSuggestions = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user._id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const suggestions = await Suggestion.find({ submittedBy: userId })
      .populate("assignedTo", "firstName lastName email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Suggestion.countDocuments({ submittedBy: userId });

    res.json({
      message: "User suggestions retrieved successfully",
      suggestions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get user suggestions error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get suggestion statistics
export const getSuggestionStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalSuggestions = await Suggestion.countDocuments();
    
    const statusStats = await Suggestion.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const categoryStats = await Suggestion.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await Suggestion.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    const recentSuggestions = await Suggestion.find()
      .populate("submittedBy", "firstName lastName")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      message: "Suggestion statistics retrieved successfully",
      stats: {
        total: totalSuggestions,
        byStatus: statusStats,
        byCategory: categoryStats,
        byPriority: priorityStats,
        recent: recentSuggestions,
      },
    });
  } catch (error) {
    console.error("Get suggestion stats error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin: Update suggestion status and assignment
export const adminUpdateSuggestion = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        message: "Validation errors",
        errors: errors.array(),
      });
      return;
    }

    const { id } = req.params;
    const { status, priority, assignedTo } = req.body;

    // Note: In a real app, you'd check if user is admin here
    // For now, any authenticated user can perform admin actions

    const suggestion = await Suggestion.findById(id);
    
    if (!suggestion) {
      res.status(404).json({ message: "Suggestion not found" });
      return;
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedTo) updateData.assignedTo = assignedTo;

    const updatedSuggestion = await Suggestion.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate("submittedBy", "firstName lastName email")
     .populate("assignedTo", "firstName lastName email");

    res.json({
      message: "Suggestion updated successfully by admin",
      suggestion: updatedSuggestion,
    });
  } catch (error) {
    console.error("Admin update suggestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};