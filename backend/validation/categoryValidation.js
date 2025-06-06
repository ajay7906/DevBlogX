const validateCategoryInput = (data) => {
    let errors = {};

    if (!data.name || data.name.trim() === '') {
        errors.name = 'Category name is required';
    } else if (data.name.length > 50) {
        errors.name = 'Category name must be less than 50 characters';
    }

    if (data.description && data.description.length > 200) {
        errors.description = 'Description must be less than 200 characters';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};

module.exports = { validateCategoryInput };