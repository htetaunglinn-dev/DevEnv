import express from 'express';
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  toggleLike,
  getMyArticles
} from '../controllers/articleController';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import {
  validateArticleCreation,
  validateArticleUpdate,
  validateArticleId,
  validatePagination
} from '../validators/articleValidator';
import { handleValidationErrors } from '../middleware/validation';

const router = express.Router();

router.post('/', authenticateToken, validateArticleCreation, handleValidationErrors, createArticle);

router.get('/', validatePagination, handleValidationErrors, getArticles);

router.get('/my-articles', authenticateToken, validatePagination, handleValidationErrors, getMyArticles);

router.get('/:id', validateArticleId, handleValidationErrors, optionalAuth, getArticleById);

router.put('/:id', authenticateToken, validateArticleUpdate, handleValidationErrors, updateArticle);

router.delete('/:id', authenticateToken, validateArticleId, handleValidationErrors, deleteArticle);

router.post('/:id/like', authenticateToken, validateArticleId, handleValidationErrors, toggleLike);

export default router;