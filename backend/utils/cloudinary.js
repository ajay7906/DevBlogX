const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'instacone',
    api_key: '169135177826417',
    api_secret: 'OXuK15JwJt0migMs8RJP1imQRyY',
});



//upload file to the cloudinary 
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder:'blog-posts',
            resource_type:'auto'
        });

        // delete file from the server after upload
        fs.unlinkSync(file.path);
        return result;

        
    } catch (error) {
        if(fs.existsSync(file.path)){
            fs.unlinkSync(file.path);
        }
        console.log(`Server error ${error}`);
        res.status(500).json({success: false, message: `Server error ${error}`});
        
    }
}


const deleteFromCloudinary = async (publicId) =>{
    try {
        await cloudinary.uploader.destroy(publicId);
        
    } catch (error) {
        console.log('Server error', error);
        throw error;
        
    }
};


module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
}