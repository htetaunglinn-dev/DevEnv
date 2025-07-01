"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateValidation = exports.updateStatusValidation = exports.voteValidation = exports.addCommentValidation = exports.updateSuggestionValidation = exports.createSuggestionValidation = void 0;
const express_validator_1 = require("express-validator");
// Validation for creating a suggestion
exports.createSuggestionValidation = [
    (0, express_validator_1.body)('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters'),
    (0, express_validator_1.body)('category')
        .optional()
        .isIn(['feature', 'improvement', 'bug', 'other'])
        .withMessage('Category must be one of: feature, improvement, bug, other'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be one of: low, medium, high, critical'),
    (0, express_validator_1.body)('tags')
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
exports.updateSuggestionValidation = [
    (0, express_validator_1.body)('title')
        .optional()
        .trim()
        .isLength({ min: 5, max: 200 })
        .withMessage('Title must be between 5 and 200 characters'),
    (0, express_validator_1.body)('description')
        .optional()
        .trim()
        .isLength({ min: 10, max: 2000 })
        .withMessage('Description must be between 10 and 2000 characters'),
    (0, express_validator_1.body)('category')
        .optional()
        .isIn(['feature', 'improvement', 'bug', 'other'])
        .withMessage('Category must be one of: feature, improvement, bug, other'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be one of: low, medium, high, critical'),
    (0, express_validator_1.body)('tags')
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
exports.addCommentValidation = [
    (0, express_validator_1.body)('message')
        .trim()
        .notEmpty()
        .withMessage('Comment message is required')
        .isLength({ min: 1, max: 500 })
        .withMessage('Comment must be between 1 and 500 characters'),
];
// Validation for voting
exports.voteValidation = [
    (0, express_validator_1.body)('voteType')
        .notEmpty()
        .withMessage('Vote type is required')
        .isIn(['upvote', 'downvote'])
        .withMessage('Vote type must be either "upvote" or "downvote"'),
];
// Validation for updating suggestion status (admin only)
exports.updateStatusValidation = [
    (0, express_validator_1.body)('status')
        .notEmpty()
        .withMessage('Status is required')
        .isIn(['pending', 'in-review', 'approved', 'rejected', 'implemented'])
        .withMessage('Status must be one of: pending, in-review, approved, rejected, implemented'),
    (0, express_validator_1.body)('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Assigned to must be a valid user ID'),
];
// Validation for admin actions
exports.adminUpdateValidation = [
    (0, express_validator_1.body)('status')
        .optional()
        .isIn(['pending', 'in-review', 'approved', 'rejected', 'implemented'])
        .withMessage('Status must be one of: pending, in-review, approved, rejected, implemented'),
    (0, express_validator_1.body)('priority')
        .optional()
        .isIn(['low', 'medium', 'high', 'critical'])
        .withMessage('Priority must be one of: low, medium, high, critical'),
    (0, express_validator_1.body)('assignedTo')
        .optional()
        .isMongoId()
        .withMessage('Assigned to must be a valid user ID'),
];
exports.default = {
    createSuggestionValidation: exports.createSuggestionValidation,
    updateSuggestionValidation: exports.updateSuggestionValidation,
    addCommentValidation: exports.addCommentValidation,
    voteValidation: exports.voteValidation,
    updateStatusValidation: exports.updateStatusValidation,
    adminUpdateValidation: exports.adminUpdateValidation,
};
//# sourceMappingURL=suggestionValidation.js.map