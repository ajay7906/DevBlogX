// connet db here ok 
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connet(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit process with failure
    }
}
module.exports = connectDB;