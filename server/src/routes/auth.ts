import express, { Response } from "express";
import User from "../models/User";
import { authenticateToken } from "../middleware/auth";
import { generateToken } from "../utils/jwt";
import { validateRegisterInput, validateLoginInput } from "../utils/validation";
import {
  AuthRequest,
  RegisterRequest,
  LoginRequest,
  UpdateProfileRequest,
  AuthResponse,
  ApiResponse,
} from "../types";

const router = express.Router();

// User Registration (only for user role)
router.post(
  "/register",
  async (
    req: AuthRequest,
    res: Response<AuthResponse | ApiResponse>
  ): Promise<void> => {
    try {
      const { name, email, password }: RegisterRequest = req.body;

      // Validate input
      const validationError = validateRegisterInput({ name, email, password });
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

      // Create user (role is automatically set to 'user')
      const user = new User({
        name,
        email,
        password,
        role: "user" as const,
      });

      await user.save();

      // Generate JWT token
      const token = generateToken(user._id);

      res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// User Login
router.post(
  "/login",
  async (
    req: AuthRequest,
    res: Response<AuthResponse | ApiResponse>
  ): Promise<void> => {
    try {
      const { email, password }: LoginRequest = req.body;

      // Validate input
      const validationError = validateLoginInput({ email, password });
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      // Find user
      const user = await User.findOne({ email });
      if (!user || !user.isActive) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // Generate JWT token
      const token = generateToken(user._id);

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// Get current user profile
router.get(
  "/profile",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    res.json({
      user: {
        id: req.user!._id,
        name: req.user!.name,
        email: req.user!.email,
        role: req.user!.role,
        createdAt: req.user!.createdAt,
      },
    });
  }
);

// Update user profile
router.put(
  "/profile",
  authenticateToken,
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { name }: UpdateProfileRequest = req.body;

      if (!name || name.trim().length === 0) {
        res.status(400).json({ error: "Name is required" });
        return;
      }

      if (name.length < 2 || name.length > 50) {
        res
          .status(400)
          .json({ error: "Name must be between 2 and 50 characters" });
        return;
      }

      const user = await User.findByIdAndUpdate(
        req.user!._id,
        { name: name.trim() },
        { new: true, runValidators: true }
      ).select("-password");

      res.json({
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      const err = error as Error;
      res.status(500).json({ error: err.message });
    }
  }
);

// Logout (client-side token removal)
router.post(
  "/logout",
  authenticateToken,
  (req: AuthRequest, res: Response): void => {
    res.json({ message: "Logged out successfully" });
  }
);

export default router;
