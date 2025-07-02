import { body, query } from 'express-validator';

export const createPostValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
  
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  body('category')
    .optional()
    .isIn(['general', 'news', 'tutorial', 'lifestyle', 'technology', 'other'])
    .withMessage('Invalid category'),
  
  body('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status')
];

export const updatePostValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content cannot be empty'),
  
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  
  body('category')
    .optional()
    .isIn(['general', 'news', 'tutorial', 'lifestyle', 'technology', 'other'])
    .withMessage('Invalid category'),
  
  body('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status')
];

export const getPostsValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('category')
    .optional()
    .isIn(['all', 'general', 'news', 'tutorial', 'lifestyle', 'technology', 'other'])
    .withMessage('Invalid category'),
  
  query('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Invalid status'),
  
  query('search')
    .optional()
    .isString()
    .withMessage('Search must be a string'),
  
  query('tags')
    .optional()
    .isString()
    .withMessage('Tags must be a string')
];