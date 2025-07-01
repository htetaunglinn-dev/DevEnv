import { body, param, query } from 'express-validator';

export const validateArticleCreation = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  
  body('thumbnail')
    .optional()
    .isURL()
    .withMessage('Thumbnail must be a valid URL'),
  
  body('shareUrl')
    .optional()
    .isURL()
    .withMessage('Share URL must be a valid URL'),
  
  body('category')
    .optional()
    .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other'])
    .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Each tag must not exceed 50 characters'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be one of: draft, published, archived')
];

export const validateArticleUpdate = [
  param('id')
    .isMongoId()
    .withMessage('Invalid article ID'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters'),
  
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  
  body('thumbnail')
    .optional()
    .isURL()
    .withMessage('Thumbnail must be a valid URL'),
  
  body('shareUrl')
    .optional()
    .isURL()
    .withMessage('Share URL must be a valid URL'),
  
  body('category')
    .optional()
    .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other'])
    .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other'),
  
  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),
  
  body('tags.*')
    .optional()
    .isLength({ max: 50 })
    .withMessage('Each tag must not exceed 50 characters'),
  
  body('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be one of: draft, published, archived')
];

export const validateArticleId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid article ID')
];

export const validatePagination = [
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
    .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other', 'all'])
    .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other, all'),
  
  query('status')
    .optional()
    .isIn(['draft', 'published', 'archived'])
    .withMessage('Status must be one of: draft, published, archived'),
  
  query('search')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query must not exceed 100 characters')
];