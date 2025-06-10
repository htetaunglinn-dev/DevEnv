import { Request } from "express";
import { Document } from "mongoose";

// User interface for MongoDB document
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  isActive: boolean;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Extended Request interface to include user
export interface AuthRequest extends Request {
  user?: IUser;
}

// JWT payload interface
export interface JWTPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

// Request body interfaces
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  name: string;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserStatusRequest {
  isActive: boolean;
}

// Response interfaces
export interface AuthResponse {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}
