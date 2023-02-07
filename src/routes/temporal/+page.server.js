import { fail } from '@sveltejs/kit';
import { accountSchema } from "../../lib/schemas";
import { validateData } from "../../lib/utils";

let loginData = Object.create(null, {});
let profileData = Object.create(null, {}); // name, surname
let agreementData = Object.create(null, {});
let meetplaceData = '';

export const actions = {
    handleAccount: async ({ request }) => {
        let { isLast, data } = await extractData(request);

        data = { ...data, termCondition: Boolean(data.termCondition === 'on'), personalInfo: Boolean(data.personalInfo === 'on') }

        loginData = { email: data.email, password: data.password };
        profileData = { phone: data.phone, cedula: data.cedula }
        meetplaceData = data.meetplace;
        agreementData = { termCondition: data.termCondition, personalInfo: data.personalInfo }

        console.log('data:', data);

        return await handleValidation(data, accountSchema, Boolean(isLast));
    },

    profile: async ({ request }) => {
        console.log('login data:', loginData);
        const values = await request.formData();
        const { isLast, ...profileData } = Object.fromEntries(values.entries());

        // return await handleValidation(profileData, profileSchema, Boolean(isLast));
    },
}

const extractData = async (request) => {
    const values = await request.formData();
    const { isLast, ...data } = Object.fromEntries(values.entries());

    return { isLast, data };
}

const handleValidation = async (data, schema, isLast) => {
    const { errors } = await validateData(data, schema);

    console.log('handle validation errors: ', errors);

    if (errors) {
        return fail(400, {
            errors: errors.fieldErrors
        });
    }

    if (isLast) console.log('YEAH! Es el último paso.')
}
