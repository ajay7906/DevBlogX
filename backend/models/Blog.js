const mongoose = require('mongoose');
const { ref } = require('vue');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true, "title is requried"],
        minlength:[100, 'Title can not exceed 100 character'],
        trim: true
    },
    content:{
        type: String,
        required:[true, 'Content is requried'],

    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    tags:{
        type: [String],
        default:[]
    },
    featuresImages:{
        type: String,
        default:''
    },
    status:{
        type: String,
        enum:['draft', 'published'],
        default: 'draft'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});

blogSchema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});


// text index for the search
blogSchema.index({title:'text', content:'text', tags:'text'});

module.exports = mongoose.model('BlogPost', blogSchema);