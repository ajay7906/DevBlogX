const validationBlogPostInput = (data) => {
    let errors = {};
     if(!data.title || data.title.trim()===''){
        errors.title = 'Title is required';
     } else if(data.title.length > 200){
        errors.title = 'Title must be less than 200 characters';
     }

     if(!data.content || data.content.trim()===''){
        errors.content = 'Content is required';
     }

     if(!data.category || data.category.trim()===''){
        errors.category = 'Category is required';
     }
     if(!data.tags || data.tags.trim()===''){
        errors.tags = 'At least one tag is required';
     }

     return {
        errors,
        isValid: Object.keys(errors).length === 0
     }
    
}

module.exports = {validationBlogPostInput};