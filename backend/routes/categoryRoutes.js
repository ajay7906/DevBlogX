const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
// const { protect, authorize } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');

router.get('/get_category', categoryController.getAllCategories);
router.post('/add_category',isAdmin,  categoryController.createCategory);
router.put('/:id',  categoryController.updateCategory);
router.delete('/:id',  categoryController.deleteCategory);

module.exports = router;