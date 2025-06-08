const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogPostController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes
router.get('/', blogPostController.getAllBlogPosts);
router.get('/:slug', blogPostController.getBlogPostBySlug);
router.get('/author/:authorId', blogPostController.getPostsByAuthor);

// Protected routes
router.post('/', protect, authorize('author', 'admin'), upload.single('featuredImage'), blogPostController.createBlogPost);
router.put('/:id', protect, authorize('author', 'admin'), upload.single('featuredImage'), blogPostController.updateBlogPost);
router.delete('/:id', protect, authorize('author', 'admin'), blogPostController.deleteBlogPost);

// Admin-only routes
router.get('/admin/posts', protect, authorize('admin'), blogPostController.getAllPostsForAdmin);

module.exports = router;