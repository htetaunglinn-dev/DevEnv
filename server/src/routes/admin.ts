import express, { Response } from "express";
import User from "../models/User";
import { authenticateToken, requireAdmin } from "../middleware/auth";
import { validateCreateAdminInput } from "../utils/validation";
import {
  AuthRequest,
  CreateAdminRequest,
  UpdateUserStatusRequest,
  ApiResponse,
} from "../types";

const router = express.Router();

// Create admin user (only existing admins can create new admins)
router.post(
  "/create-admin",
  authenticateToken,
  requireAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name, email, password }: CreateAdminRequest = req.body;

      // Validate input
      const validationError = validateCreateAdminInput({
        name,
        email,
        password,
      });
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.status(400).json({ error: "User already exists with this email" });
        return;
      }

      // Create admin user
      const admin = new User({
        name,
        email,
        password,
        role: "admin" as const,
      });

      await admin.save();

      res.status(201).json({
        message: "Admin created successfully",
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// Get all users (admin only)
router.get(
  "/users",
  authenticateToken,
  requireAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const users = await User.find({})
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await User.countDocuments();

      res.json({
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// Update user status (admin only)
router.put(
  "/users/:id/status",
  authenticateToken,
  requireAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { isActive }: UpdateUserStatusRequest = req.body;
      const userId = req.params.id;

      if (typeof isActive !== "boolean") {
        res.status(400).json({ error: "isActive must be a boolean value" });
        return;
      }

      const user = await User.findByIdAndUpdate(
        userId,
        { isActive },
        { new: true, runValidators: true }
      ).select("-password");

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({
        message: "User status updated successfully",
        user,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// Delete user (admin only)
router.delete(
  "/users/:id",
  authenticateToken,
  requireAdmin,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const userId = req.params.id;

      // Prevent admin from deleting themselves
      if (userId === req.user!._id.toString()) {
        res.status(400).json({ error: "Cannot delete your own account" });
        return;
      }

      const user = await User.findByIdAndDelete(userId);

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ message: "User deleted successfully" });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
