const express = require('express');
const router = express.Router();
const blogPostController = require('../controllers/blogControllers');
// const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const isAdmin = require('../middleware/isAdmin');


// Public routes
router.get('/getAllBlog', blogPostController.getAllBlogPosts);
router.get('/:slug', blogPostController.getBlogPostBySlug);
router.get('/author/:authorId', blogPostController.getPostsByAuthor);

// Protected routes
router.post('/postblog', isAdmin,  upload.single('featuredImage'), blogPostController.createBlogPost);
router.put('/:id', isAdmin,  upload.single('featuredImage'), blogPostController.updateBlogPost);
router.delete('/:id',isAdmin,  blogPostController.deleteBlogPost);
router.get('/getpostbyid/:blogId', blogPostController.getBlogPostById);

// Admin-only routes
router.get('/admin/posts',  blogPostController.getAllPostsForAdmin);


module.exports = router;