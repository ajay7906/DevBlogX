const mongoose = require('mongoose');
// const { type } = require('os');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email:{
        type: String,
        required:[true, 'Email is required'],
        unique: true,
        lowercase: true,
        validator:[validator.isEmail, "Invalid email"]
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength:[6, "Password should atleast 6 characters"]
    },
    loginAttampts: {
        type: Number,
        default: 0
    },
    blockExperies:{
        type: Date,
        default: null,
    }

}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
