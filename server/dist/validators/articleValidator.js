"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePagination = exports.validateArticleId = exports.validateArticleUpdate = exports.validateArticleCreation = void 0;
const express_validator_1 = require("express-validator");
exports.validateArticleCreation = [
    (0, express_validator_1.body)('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('content')
        .trim()
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    (0, express_validator_1.body)('thumbnail')
        .optional()
        .isURL()
        .withMessage('Thumbnail must be a valid URL'),
    (0, express_validator_1.body)('shareUrl')
        .optional()
        .isURL()
        .withMessage('Share URL must be a valid URL'),
    (0, express_validator_1.body)('category')
        .optional()
        .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other'])
        .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    (0, express_validator_1.body)('tags.*')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Each tag must not exceed 50 characters'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published', 'archived'])
        .withMessage('Status must be one of: draft, published, archived')
];
exports.validateArticleUpdate = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid article ID'),
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters'),
    (0, express_validator_1.body)('content')
        .optional()
        .trim()
        .isLength({ min: 10 })
        .withMessage('Content must be at least 10 characters long'),
    (0, express_validator_1.body)('thumbnail')
        .optional()
        .isURL()
        .withMessage('Thumbnail must be a valid URL'),
    (0, express_validator_1.body)('shareUrl')
        .optional()
        .isURL()
        .withMessage('Share URL must be a valid URL'),
    (0, express_validator_1.body)('category')
        .optional()
        .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other'])
        .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other'),
    (0, express_validator_1.body)('tags')
        .optional()
        .isArray()
        .withMessage('Tags must be an array'),
    (0, express_validator_1.body)('tags.*')
        .optional()
        .isLength({ max: 50 })
        .withMessage('Each tag must not exceed 50 characters'),
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['draft', 'published', 'archived'])
        .withMessage('Status must be one of: draft, published, archived')
];
exports.validateArticleId = [
    (0, express_validator_1.param)('id')
        .isMongoId()
        .withMessage('Invalid article ID')
];
exports.validatePagination = [
    (0, express_validator_1.query)('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Limit must be between 1 and 100'),
    (0, express_validator_1.query)('category')
        .optional()
        .isIn(['technology', 'business', 'lifestyle', 'tutorial', 'news', 'other', 'all'])
        .withMessage('Category must be one of: technology, business, lifestyle, tutorial, news, other, all'),
    (0, express_validator_1.query)('status')
        .optional()
        .isIn(['draft', 'published', 'archived'])
        .withMessage('Status must be one of: draft, published, archived'),
    (0, express_validator_1.query)('search')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Search query must not exceed 100 characters')
];
//# sourceMappingURL=articleValidator.js.map