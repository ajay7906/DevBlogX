const BlogPost = require('../models/Blog');
const User = require('../models/User');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const { validationBlogPostInput } = require('../validation/blogPostValidation');

// @desc    Create a new blog post
// @route   POST /api/posts
// @access  Private (Author/Admin)
const createBlogPost = async (req, res) => {
    try {
        // Validate input
        const { errors, isValid } = validationBlogPostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { title, content, category, tags, status } = req.body;
        
        // Handle featured image upload if present
        let featuredImage = {};
        if (req.file) {
            const uploadResult = await uploadToCloudinary(req.file);
            featuredImage = {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id
            };
        }

        // Create slug from title
        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        // Create new post
        const newPost = new BlogPost({
            title,
            slug,
            content,
            category,
            tags: tags.split(',').map(tag => tag.trim()),
            featuredImage,
            status: status || 'draft',
            author: req.userData.userId
        });

        const savedPost = await newPost.save();

        // Update user's post count
        await User.findByIdAndUpdate(req.userData.userId, { $inc: { postCount: 1 } });

        res.status(201).json(savedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Server error while creating post ${err}` });
    }
};

// @desc    Get all published blog posts
// @route   GET /api/posts
// @access  Public




const getAllBlogPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Build query for published posts
        let query = { status: 'published' };

        // Add category filter if provided
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Add tag filter if provided
        if (req.query.tag) {
            query.tags = req.query.tag;
        }

        // Add search query if provided
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        const posts = await BlogPost.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'name')
            .populate('category', 'name')
            .lean();

        const totalPosts = await BlogPost.countDocuments(query);

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching posts' });
    }
};
















// @desc    Get a single blog post by slug
// @route   GET /api/posts/:slug
// @access  Public
const getBlogPostBySlug = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug })
            .populate('author', 'username avatar bio')
            .populate('category', 'name')
            .populate({
                path: 'comments',
                populate: {
                    path: 'author',
                    select: 'username avatar'
                }
            });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Only allow access to published posts for non-authors/admins
        if (post.status !== 'published' && 
            (!req.user || (post.author._id.toString() !== req.user.id && req.user.role !== 'admin'))) {
            return res.status(403).json({ error: 'Access to this post is restricted' });
        }

        // Increment view count if post is published
        if (post.status === 'published') {
            post.views += 1;
            await post.save();
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching post' });
    }
};

// @desc    Update a blog post
// @route   PUT /api/posts/:id
// @access  Private (Author/Admin)
const updateBlogPost = async (req, res) => {
    try {
        // Validate input
        const { errors, isValid } = validateBlogPostInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { title, content, category, tags, status } = req.body;
        
        // Find the post
        let post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if user is author or admin
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to update this post' });
        }

        // Handle featured image update if present
        let featuredImage = post.featuredImage;
        if (req.file) {
            // Delete old image if exists
            if (featuredImage.publicId) {
                await deleteFromCloudinary(featuredImage.publicId);
            }
            
            const uploadResult = await uploadToCloudinary(req.file);
            featuredImage = {
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id
            };
        }

        // Update slug if title changed
        let slug = post.slug;
        if (title !== post.title) {
            slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
            // Check if new slug is unique
            const existingPost = await BlogPost.findOne({ slug });
            if (existingPost && existingPost._id.toString() !== post._id.toString()) {
                return res.status(400).json({ error: 'Slug already exists' });
            }
        }

        // Update post
        post.title = title;
        post.slug = slug;
        post.content = content;
        post.category = category;
        post.tags = tags.split(',').map(tag => tag.trim());
        post.featuredImage = featuredImage;
        post.status = status || post.status;
        post.updatedAt = Date.now();

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while updating post' });
    }
};

// @desc    Delete a blog post
// @route   DELETE /api/posts/:id
// @access  Private (Author/Admin)
const deleteBlogPost = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if user is author or admin
        if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this post' });
        }

        // Delete featured image if exists
        if (post.featuredImage.publicId) {
            await deleteFromCloudinary(post.featuredImage.publicId);
        }

        await post.deleteOne();
        
        // Update user's posts count
        await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: -1 } });

        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while deleting post' });
    }
};

// @desc    Get posts by author
// @route   GET /api/posts/author/:authorId
// @access  Public
const getPostsByAuthor = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = { 
            author: req.params.authorId,
            status: 'published'
        };

        const posts = await BlogPost.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'username avatar')
            .populate('category', 'name')
            .lean();

        const totalPosts = await BlogPost.countDocuments(query);

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching author posts' });
    }
};

// @desc    Get all posts for admin dashboard (including drafts)
// @route   GET /api/admin/posts
// @access  Private (Admin)
const getAllPostsForAdmin = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await BlogPost.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('author', 'username avatar')
            .populate('category', 'name')
            .lean();

        const totalPosts = await BlogPost.countDocuments();

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(totalPosts / limit),
            totalPosts
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching posts for admin' });
    }
};



const toggleLiked = async (req, res) => {
   try{
     const post = await BlogPost.findById(req.params.id);
    if(!post){
        return res.status(404).json({
            success: false,
            message:'Post not found'
        });
    };
    console.log('CLICKED');
    const userId = req.userData.userId;
    const hasLiked = post.likes.includes(userId);
    if(hasLiked){
        post.likes.pull(userId);
        post.likeCount -= 1;
    }else{
        post.likes.push(userId);
        post.likeCount += 1;
    }

    const updatedPost = await post.save();

     res.json({
            success: true,
            message: hasLiked ? 'Post unliked successfully' : 'Post liked successfully',
            isLiked: !hasLiked,
            likeCount: updatedPost.likeCount,
            post: {
                id: updatedPost._id,
                title: updatedPost.title,
                slug: updatedPost.slug
            }
        });

   }catch(error){
    console.error('Server error', error);
    res.status(500).json({
        success: false,
        message:`Server error ${error}`
    })
   }

}


const getLikesStatus = async (req, res) => {
    try{
        const post = await BlogPost.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success: false,
                message:`post not found`
            });
        };
        const hasLiked = post.likes.includes(req.userData.userId);
        return res.status(200).json({
            success: false,
            message:'Post find the like ',
            isLiked: hasLiked,
            likeCount: post.likeCount
        });

    }catch(error){
        console.error('Server error', error);
        res.status(500).json({
            success: false,
            message:`Server error ${error}`
        });
    }
}





const getBlogPostById = async (req, res) => {
   try{
    const {blogId} = req.params;
    if(!blogId) {
        return res.status(400).json({ error: 'Blog ID is required' });
    }
    const blogDetails = await BlogPost.find({ _id: blogId });
    if(!blogDetails || blogDetails.length === 0) {
        return res.status(404).json({ error: 'Blog post not found' });
    }
    return res.status(200).json({
        success: true,
        data: blogDetails
    })
   } catch(error){
    console.error(error);
    return res.status(500).json({ error: `Server error while fetching blog post by ID ${error}` });
   }
}

// >>>>>>> 7eff14c8093c87144a7695d50e83710f2ebc2528
module.exports = {
    createBlogPost,
    getAllBlogPosts,
    getBlogPostBySlug,
    updateBlogPost,
    deleteBlogPost,
    getPostsByAuthor,
    getAllPostsForAdmin,
    toggleLiked,
    getLikesStatus,

    getBlogPostById
};