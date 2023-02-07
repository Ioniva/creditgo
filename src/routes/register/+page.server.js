import { fail } from '@sveltejs/kit';
import { accountSchema, profileSchema, referenceSchema, supplementSchema } from "../../lib/schemas";
import { validateData } from "../../lib/utils";

let loginData = Object.create(null, {});
let profileData = Object.create(null, {});
let agreementData = Object.create(null, {});

let meetplaceData = '';

let financialData = Object.create(null, {});
let bankAccountData = Object.create(null, {});

let guarantorData = Object.create(null, {});

export const actions = {
    handleAccount: async ({ request }) => {
        let { isLast, data } = await extractData(request);

        data = { ...data, termCondition: Boolean(data.termCondition === 'on'), personalInfo: Boolean(data.personalInfo === 'on') }

        loginData = { email: data.email, password: data.password };
        profileData = { ...profileData, phone: data.phone, cedula: data.cedula }
        meetplaceData = data.meetplace;
        agreementData = { termCondition: data.termCondition, personalInfo: data.personalInfo }

        return await handleValidation(data, accountSchema, Boolean(isLast));
    },

    handleProfile: async ({ request }) => {
        let { isLast, data } = await extractData(request);

        const parsedDispatchDate = new Date(Date.parse(data.dispatchDate));
        const parsedBirthDate = new Date(Date.parse(data.birthDate));

        data = {
            ...data,
            dispatchDate: parsedDispatchDate,
            birthDate: parsedBirthDate,
            children: Number(data.children)
        }

        // TODO: Posible refactorizacion: añadir la cedula y telefono a esta parte del formulario
        profileData = { ...profileData, data }

        return await handleValidation(data, profileSchema, Boolean(isLast));
    },

    handleSupplement: async ({ request }) => {
        let { isLast, data } = await extractData(request);


        bankAccountData = {
            bankName: data.bankName,
            bankType: data.bankType,
            bankNumber: data.bankNumber,
            holder: data.holderName
        }

        financialData = {
            employeeType: data.employeeType,
            netMonthlyIncome: data.netMonthlyIncome,
            netMonthlyExpense: data.netMonthlyExpense,
            additionalIncome: data.additionalIncome
        }

        return await handleValidation(data, supplementSchema, Boolean(isLast));
    },

    handleReference: async ({ request }) => {
        let { isLast, data } = await extractData(request);


        const parsedDispatchDate = new Date(Date.parse(data.dispatchDate));
        console.log(parsedDispatchDate)
        data = {
            ...data,
            dispatchDate: parsedDispatchDate
        }

        return await handleValidation(data, referenceSchema, Boolean(isLast));
    }
}

const extractData = async (request) => {
    const values = await request.formData();
    const { isLast, ...data } = Object.fromEntries(values.entries());
    return { isLast, data };
}

const handleValidation = async (data, schema, isLast) => {

    console.log('data:', data);

    const { errors } = await validateData(data, schema);

    console.log('errors: ', errors);

    if (errors) {
        return fail(400, {
            errors: errors.fieldErrors
        });
    }

    if (isLast) console.log('YEAH! Es el último paso.')
}
