export const validateData = async (formData, schema) => {
    // const body = Object.fromEntries(formData);

    // console.log(formData);
    try {

        const data = schema.parse(formData);
        return {
            formData: data,
            errors: null
        }

    } catch (error) {

        console.log('Error' + error);
        const errors = error.flatten();
        return {
            formData: formData,
            errors
        }

    }
}
