"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const User_1 = __importDefault(require("../models/User"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "Validation errors",
                errors: errors.array(),
            });
            return;
        }
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists with this email" });
            return;
        }
        // Create new user
        const user = new User_1.default({
            email,
            password,
            firstName,
            lastName,
        });
        await user.save();
        // Generate tokens
        const tokenPayload = { userId: user._id, email: user.email };
        const accessToken = (0, jwt_1.generateToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.status(201).json({
            message: "User registered successfully",
            user: user.toJSON(),
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "Validation errors",
                errors: errors.array(),
            });
            return;
        }
        const { email, password } = req.body;
        // Find user with password field
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        // Generate tokens
        const tokenPayload = { userId: user._id, email: user.email };
        const accessToken = (0, jwt_1.generateToken)(tokenPayload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(tokenPayload);
        res.json({
            message: "Login successful",
            user: user.toJSON(),
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
const getProfile = async (req, res) => {
    try {
        res.json({
            message: "Profile retrieved successfully",
            user: req.user.toJSON(),
        });
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "Validation errors",
                errors: errors.array(),
            });
            return;
        }
        const { firstName, lastName } = req.body;
        const userId = req.user._id;
        const updatedUser = await User_1.default.findByIdAndUpdate(userId, { firstName, lastName }, { new: true, runValidators: true });
        if (!updatedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({
            message: "Profile updated successfully",
            user: updatedUser.toJSON(),
        });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            res.status(400).json({
                message: "Validation errors",
                errors: errors.array(),
            });
            return;
        }
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;
        // Get user with password
        const user = await User_1.default.findById(userId).select("+password");
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Verify current password
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            res.status(400).json({ message: "Current password is incorrect" });
            return;
        }
        // Update password
        user.password = newPassword;
        await user.save();
        res.json({ message: "Password changed successfully" });
    }
    catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=authController.js.map