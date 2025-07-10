import { body, query } from "express-validator";

export const createCommentValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),

  body("postId")
    .notEmpty()
    .withMessage("Post ID is required")
    .isMongoId()
    .withMessage("Post ID must be a valid MongoDB ObjectId"),

  body("parentId")
    .optional()
    .isMongoId()
    .withMessage("Parent ID must be a valid MongoDB ObjectId"),
];

export const updateCommentValidation = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Comment content is required")
    .isLength({ min: 1, max: 1000 })
    .withMessage("Comment must be between 1 and 1000 characters"),
];

export const getCommentsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];
