import { Router } from 'express';
import {
  getAllSuggestions,
  getSuggestionById,
  createSuggestion,
  updateSuggestion,
  deleteSuggestion,
  voteSuggestion,
  removeVote,
  addComment,
  getUserSuggestions,
  getSuggestionStats,
  adminUpdateSuggestion,
} from '../controllers/suggestionController';
import { authenticateToken } from '../middleware/auth';
import {
  createSuggestionValidation,
  updateSuggestionValidation,
  addCommentValidation,
  voteValidation,
  adminUpdateValidation,
} from '../middleware/suggestionValidation';

const router = Router();

// Public routes (can be accessed without authentication)
router.get('/', getAllSuggestions);
router.get('/:id', getSuggestionById);

// Protected routes (require authentication)
router.post('/', authenticateToken, createSuggestionValidation, createSuggestion);
router.put('/:id', authenticateToken, updateSuggestionValidation, updateSuggestion);
router.delete('/:id', authenticateToken, deleteSuggestion);

// Voting routes
router.post('/:id/vote', authenticateToken, voteValidation, voteSuggestion);
router.delete('/:id/vote', authenticateToken, removeVote);

// Comment routes
router.post('/:id/comments', authenticateToken, addCommentValidation, addComment);

// User-specific routes
router.get('/user/my-suggestions', authenticateToken, getUserSuggestions);

// Statistics route
router.get('/stats', getSuggestionStats);

// Admin routes
router.patch('/:id/admin', authenticateToken, adminUpdateValidation, adminUpdateSuggestion);

export default router;