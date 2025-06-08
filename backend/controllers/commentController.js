const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');
const User = require('../models/User');
const { validateCommentInput } = require('../validation/commentValidation');
const Notification = require('../models/Notification');

// @desc    Add a comment to a blog post
// @route   POST /api/comments/:postId
// @access  Private
const addComment = async (req, res) => {
    try {
        // Validate input
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { content, parentComment } = req.body;
        const postId = req.params.postId;

        // Check if post exists
        const post = await BlogPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create new comment
        const newComment = new Comment({
            content,
            author: req.user.id,
            post: postId,
            parentComment: parentComment || null
        });

        const savedComment = await newComment.save();

        // Add comment to post's comments array
        post.comments.push(savedComment._id);
        await post.save();

        // Create notification for post author if it's not their own comment
        if (post.author.toString() !== req.user.id) {
            const notification = new Notification({
                recipient: post.author,
                sender: req.user.id,
                type: 'comment',
                post: postId,
                comment: savedComment._id,
                isRead: false
            });

            await notification.save();
        }

        // Populate author info before sending response
        const populatedComment = await Comment.findById(savedComment._id)
            .populate('author', 'username avatar');

        res.status(201).json(populatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while adding comment' });
    }
};

// @desc    Get comments for a blog post
// @route   GET /api/comments/:postId
// @access  Public
const getCommentsForPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        // Check if post exists
        const post = await BlogPost.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const comments = await Comment.find({ post: postId, parentComment: null })
            .populate('author', 'username avatar')
            .populate({
                path: 'replies',
                populate: {
                    path: 'author',
                    select: 'username avatar'
                }
            })
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching comments' });
    }
};

// @desc    Update a comment
// @route   PUT /api/comments/:commentId
// @access  Private (Comment author or Admin)
const updateComment = async (req, res) => {
    try {
        // Validate input
        const { errors, isValid } = validateCommentInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors);
        }

        const { content } = req.body;

        // Find the comment
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if user is comment author or admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to update this comment' });
        }

        comment.content = content;
        comment.updatedAt = Date.now();

        const updatedComment = await comment.save();
        
        // Populate author info before sending response
        const populatedComment = await Comment.findById(updatedComment._id)
            .populate('author', 'username avatar');

        res.json(populatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while updating comment' });
    }
};

// @desc    Delete a comment
// @route   DELETE /api/comments/:commentId
// @access  Private (Comment author or Admin)
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Check if user is comment author or admin
        if (comment.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Not authorized to delete this comment' });
        }

        // Remove comment reference from the post
        await BlogPost.findByIdAndUpdate(comment.post, {
            $pull: { comments: comment._id }
        });

        // Delete any replies to this comment
        await Comment.deleteMany({ parentComment: comment._id });

        // Delete the comment
        await comment.remove();

        res.json({ success: true, message: 'Comment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while deleting comment' });
    }
};

module.exports = {
    addComment,
    getCommentsForPost,
    updateComment,
    deleteComment
};