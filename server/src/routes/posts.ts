import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  toggleLike,
  getMyPosts
} from '../controllers/postController';
import { authenticateToken, optionalAuth } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';
import { requireAdminOrAuthor } from '../middleware/admin';
import {
  createPostValidation,
  updatePostValidation,
  getPostsValidation
} from '../validators/postValidator';
import { uploadSingle } from '../middleware/upload';
import { uploadImage, uploadImageToCloudinary } from '../utils/cloudinaryUpload';

const router = express.Router();

// Image upload endpoint
router.post(
  '/upload-image',
  authenticateToken,
  uploadSingle('image'),
  uploadImage
);

router.post(
  '/',
  authenticateToken,
  uploadSingle('image'),
  uploadImageToCloudinary,
  createPostValidation,
  handleValidationErrors,
  createPost
);

router.get(
  '/',
  getPostsValidation,
  handleValidationErrors,
  getPosts
);

router.get(
  '/my-posts',
  authenticateToken,
  getPostsValidation,
  handleValidationErrors,
  getMyPosts
);

router.get(
  '/:id',
  optionalAuth,
  getPostById
);

router.put(
  '/:id',
  requireAdminOrAuthor,
  updatePostValidation,
  handleValidationErrors,
  updatePost
);

router.delete(
  '/:id',
  requireAdminOrAuthor,
  deletePost
);

router.post(
  '/:id/like',
  authenticateToken,
  toggleLike
);

export default router;