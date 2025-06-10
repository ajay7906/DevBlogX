const { uploadToCloudinary } = require("../utils/cloudinary");
const { validationBlogPostInput } = require("../validation/blogPostValidation");




const createBlogPost = async (req, res) => {
    try{
        const {errors, isValid} =  validationBlogPostInput(req.body);
        if(!isValid){
            return res.status(400).json(errors);
        };
        const {title, content,  category, tags, status } = req.body;
        let featuredImage = {};
        if(req.file){
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
            author: req.user.id
        });

        const savedPost = await newPost.save();

        // Update user's posts count
        await User.findByIdAndUpdate(req.user.id, { $inc: { postCount: 1 } });

        res.status(201).json(savedPost);
        await User.findBy



    }catch(error){
        console.log('Server eeror', error);

    }
}


const getAllBlogPosts = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        let query = { status: 'published'};
        // add category filter if applyed
        if(req.query.category){
            
        }

    }catch(error){
        console.log('Server error', error);
    }
}



module.exports = {
    createBlogPost,

}