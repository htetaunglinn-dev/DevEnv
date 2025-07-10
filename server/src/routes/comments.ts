import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
  toggleCommentLike,
  getCommentReplies,
} from "../controllers/commentController";
import { authenticateToken } from "../middleware/auth";
import { handleValidationErrors } from "../middleware/validation";
import {
  createCommentValidation,
  updateCommentValidation,
} from "../validators/commentValidator";

const router = express.Router();

// Create a comment
router.post(
  "/",
  authenticateToken,
  createCommentValidation,
  handleValidationErrors,
  createComment
);

// Get comments for a post
router.get("/post/:postId", getComments);

// Get replies for a comment
router.get("/:id/replies", getCommentReplies);

// Update a comment
router.put(
  "/:id",
  authenticateToken,
  updateCommentValidation,
  handleValidationErrors,
  updateComment
);

// Delete a comment
router.delete("/:id", authenticateToken, deleteComment);

// Toggle like on a comment
router.post("/:id/like", authenticateToken, toggleCommentLike);

export default router;
