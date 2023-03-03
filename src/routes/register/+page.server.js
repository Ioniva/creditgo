import {fail} from '@sveltejs/kit';
import {accountSchema, profileSchema, referenceSchema, supplementSchema} from "../../lib/schemas";
import {validateData} from "../../lib/utils";
// import LoginApiCommand from '../../lib/commands/LoginApiCommand';
// import PersonalApiCommand from '../../lib/commands/PersonalApiCommand';

const state = {
    loginData: {},
    profileData: {},
    agreementData: {},
    meetplaceData: '',
    financialData: {},
    bankAccountData: {},
    guarantorData: {}
};

export const actions = {
    handleAccount: async ({request}) => {
        let {isLast, data} = await extractData(request);

        state.loginData = {email: data.email, password: data.password};
        state.profileData = {...state.profileData, phone: data.phone, cedula: data.cedula}
        state.meetplaceData = data.meetplace;
        state.agreementData = {termCondition: data.termCondition, personalInfo: data.personalInfo}

        return await handleValidation({
            ...data,
            termCondition: Boolean(data.termCondition === 'on'),
            personalInfo: Boolean(data.personalInfo === 'on')
        }, accountSchema, isLast);
    },

    handleProfile: async ({request}) => {
        let {isLast, data} = await extractData(request);

        const parsedDispatchDate = new Date(Date.parse(data.dispatchDate));
        const parsedBirthDate = new Date(Date.parse(data.birthDate));

        state.profileData = {
            ...state.profileData,
            ...data,
            dispatchDate: parsedDispatchDate,
            birthDate: parsedBirthDate,
            children: Number(data.children)
        }

        // TODO: Posible refactorizacion: añadir la cedula y telefono a esta parte del formulario
        return await handleValidation(state.profileData, profileSchema, isLast);
    },

    handleSupplement: async ({request}) => {
        let {isLast, data} = await extractData(request);

        state.bankAccountData = {
            bankName: data.bankName,
            bankType: data.bankType,
            bankNumber: data.bankNumber,
            holder: data.holderName
        }

        state.financialData = {
            employeeType: data.employeeType,
            netMonthlyIncome: data.netMonthlyIncome,
            netMonthlyExpense: data.netMonthlyExpense,
            additionalIncome: data.additionalIncome
        }

        return await handleValidation(data, supplementSchema, isLast);
    },

    handleReference: async ({request}) => {
        let {isLast, data} = await extractData(request);

        const parsedDispatchDate = new Date(Date.parse(data.dispatchDate));

        return await handleValidation({
            ...data,
            dispatchDate: parsedDispatchDate
        }, referenceSchema, isLast);
    }
}

const extractData = async (request) => {
    const values = await request.formData();
    const {isLast, ...data} = Object.fromEntries(values.entries());
    return {isLast, data};
}

const handleValidation = async (data, schema, isLast) => {
    const {errors} = await validateData(data, schema);

    if (errors) {
        return fail(400, {
            errors: errors.fieldErrors
        });
    }

    console.log(data);

    // if (isLast) {
    //     submitForm();
    // }
}

// const submitForm = () => {

//     const loginApiCommand = new LoginApiCommand(state.loginData);
//     // const personalApiCommand = new PersonalApiCommand(state.personalData);

//     Promise.all([loginApiCommand.execute()])
//         .then(result => {
//             console.log("All API calls succeeded:", result);
//             return result;
//         })
//         .catch(error => {
//             loginApiCommand.undo();
//             // personalApiCommand.undo();
//             throw error;
//         })
// }
