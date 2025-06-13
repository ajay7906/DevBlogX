const Category = require('../models/Category');
const BlogPost = require('../models/Blog');
const { validateCategoryInput } = require('../validation/categoryValidation');

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private (Admin)
const createCategory = async (req, res) => {
    try {
        if (req.userData.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Validate input
        const { errors, isValid } = validateCategoryInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { name, description } = req.body;

        // Create slug from name
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // Check if category already exists
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        // Create new category
        const newCategory = new Category({
            name,
            slug,
            description
        });

        const savedCategory = await newCategory.save();
        res.status(201).json({
            data:savedCategory,
            categoryId: newCategory._id
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Server error while creating category ${err}` });
    }
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        
        // Get post count for each category
        const categoriesWithCount = await Promise.all(
            categories.map(async (category) => {
                const postCount = await BlogPost.countDocuments({ 
                    category: category._id,
                    status: 'published'
                });
                return {
                    ...category.toObject(),
                    postCount
                };
            })
        );

        res.json(categoriesWithCount);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching categories' });
    }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private (Admin)
const updateCategory = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        // Validate input
        const { errors, isValid } = validateCategoryInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { name, description } = req.body;

        // Find the category
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update slug if name changed
        let slug = category.slug;
        if (name !== category.name) {
            slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            
            // Check if new slug already exists
            const existingCategory = await Category.findOne({ slug });
            if (existingCategory && existingCategory._id.toString() !== req.params.id) {
                return res.status(400).json({ error: 'Category with this name already exists' });
            }
        }

        // Update category
        category.name = name;
        category.slug = slug;
        category.description = description;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while updating category' });
    }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private (Admin)
const deleteCategory = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Check if category is in use
        const postsWithCategory = await BlogPost.countDocuments({ category: category._id });
        if (postsWithCategory > 0) {
            return res.status(400).json({ 
                error: 'Cannot delete category with associated posts' 
            });
        }

        await category.remove();
        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while deleting category' });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};