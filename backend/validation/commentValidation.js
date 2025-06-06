const validateCommentInput = (data) => {
    let errors = {};

    if (!data.content || data.content.trim() === '') {
        errors.content = 'Comment content is required';
    } else if (data.content.length > 1000) {
        errors.content = 'Comment must be less than 1000 characters';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

module.exports = { validateCommentInput };