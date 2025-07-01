"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const suggestionController_1 = require("../controllers/suggestionController");
const auth_1 = require("../middleware/auth");
const suggestionValidation_1 = require("../middleware/suggestionValidation");
const router = (0, express_1.Router)();
// Public routes (can be accessed without authentication)
router.get('/', suggestionController_1.getAllSuggestions);
router.get('/:id', suggestionController_1.getSuggestionById);
// Protected routes (require authentication)
router.post('/', auth_1.authenticateToken, suggestionValidation_1.createSuggestionValidation, suggestionController_1.createSuggestion);
router.put('/:id', auth_1.authenticateToken, suggestionValidation_1.updateSuggestionValidation, suggestionController_1.updateSuggestion);
router.delete('/:id', auth_1.authenticateToken, suggestionController_1.deleteSuggestion);
// Voting routes
router.post('/:id/vote', auth_1.authenticateToken, suggestionValidation_1.voteValidation, suggestionController_1.voteSuggestion);
router.delete('/:id/vote', auth_1.authenticateToken, suggestionController_1.removeVote);
// Comment routes
router.post('/:id/comments', auth_1.authenticateToken, suggestionValidation_1.addCommentValidation, suggestionController_1.addComment);
// User-specific routes
router.get('/user/my-suggestions', auth_1.authenticateToken, suggestionController_1.getUserSuggestions);
// Statistics route
router.get('/stats', suggestionController_1.getSuggestionStats);
// Admin routes
router.patch('/:id/admin', auth_1.authenticateToken, suggestionValidation_1.adminUpdateValidation, suggestionController_1.adminUpdateSuggestion);
exports.default = router;
//# sourceMappingURL=suggestions.js.map