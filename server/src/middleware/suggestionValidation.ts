import { body } from 'express-validator';

// Validation for creating a suggestion
export const createSuggestionValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('category')
    .optional()
    .isIn(['feature', 'improvement', 'bug', 'other'])
    .withMessage('Category must be one of: feature, improvement, bug, other'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be one of: low, medium, high, critical'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      if (tags) {
        for (const tag of tags) {
          if (typeof tag !== 'string' || tag.length > 30) {
            throw new Error('Each tag must be a string with maximum 30 characters');
          }
        }
      }
      return true;
    }),
];

// Validation for updating a suggestion
export const updateSuggestionValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  
  body('category')
    .optional()
    .isIn(['feature', 'improvement', 'bug', 'other'])
    .withMessage('Category must be one of: feature, improvement, bug, other'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be one of: low, medium, high, critical'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array')
    .custom((tags) => {
      if (tags && tags.length > 10) {
        throw new Error('Maximum 10 tags allowed');
      }
      if (tags) {
        for (const tag of tags) {
          if (typeof tag !== 'string' || tag.length > 30) {
            throw new Error('Each tag must be a string with maximum 30 characters');
          }
        }
      }
      return true;
    }),
];

// Validation for adding a comment
export const addCommentValidation = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Comment message is required')
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters'),
];

// Validation for voting
export const voteValidation = [
  body('voteType')
    .notEmpty()
    .withMessage('Vote type is required')
    .isIn(['upvote', 'downvote'])
    .withMessage('Vote type must be either "upvote" or "downvote"'),
];

// Validation for updating suggestion status (admin only)
export const updateStatusValidation = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['pending', 'in-review', 'approved', 'rejected', 'implemented'])
    .withMessage('Status must be one of: pending, in-review, approved, rejected, implemented'),
  
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Assigned to must be a valid user ID'),
];

// Validation for admin actions
export const adminUpdateValidation = [
  body('status')
    .optional()
    .isIn(['pending', 'in-review', 'approved', 'rejected', 'implemented'])
    .withMessage('Status must be one of: pending, in-review, approved, rejected, implemented'),
  
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'critical'])
    .withMessage('Priority must be one of: low, medium, high, critical'),
  
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Assigned to must be a valid user ID'),
];

export default {
  createSuggestionValidation,
  updateSuggestionValidation,
  addCommentValidation,
  voteValidation,
  updateStatusValidation,
  adminUpdateValidation,
};