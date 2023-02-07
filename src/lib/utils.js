export const validateData = async (formData, schema) => {
    try {
        return schema.parse(formData);
    } catch (error) {
        const errors = error.flatten();
        return { errors: errors }
    }
}
