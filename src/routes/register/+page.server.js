import {fail} from '@sveltejs/kit';
import {accountSchema, profileSchema, referenceSchema, supplementSchema} from "../../lib/schemas.js";
import {validateData} from "../../lib/utils.js";

import LoginApiCommand from '../../lib/commands/LoginApiCommand.js';
import BankAccountApiCommand from '../../lib/commands/BankAccountApiCommand.js';
import FinancialApiCommand from '../../lib/commands/FinancialApiCommand.js';
import GuarantorApiCommand from '../../lib/commands/GuarantorApiCommand.js';
import UserApiCommand from '../../lib/commands/UserApiCommand.js';

const state = {
    login: {},
    bankAccount: {},
    financial: {},
    guarantor: {},
    user: {}
};

const extractData = async (request) => {
    const values = await request.formData();
    const {isLast, ...data} = Object.fromEntries(values.entries());
    return {isLast, data};
}


export const actions = {
    handleAccount: async ({request}) => {
            const {isLast, data} = await extractData(request);

            state.login = {email: data.email, password: data.password};
            state.user = { phone: data.phone, cedula: data.cedula, meetPlace: data.meetPlace };

            const accountData = {
                ...data,
                termCondition: Boolean(data.termCondition === 'on'),
                personalInfo: Boolean(data.personalInfo === 'on')
            }

           return await handleValidation(accountData, accountSchema, isLast);
    },

    handleProfile: async ({request}) => {
        let {isLast, data} = await extractData(request);

        const parsedDispatchDate = new Date(Date.parse(data.dispatchDate));
        const parsedBirthDate = new Date(Date.parse(data.birthDate));

        state.user = {
            ...state.user,
            ...data,
            dispatchDate: parsedDispatchDate,
            birthDate: parsedBirthDate,
            children: Number(data.children)
        }

        // TODO: Posible refactorizacion: añadir la cedula y telefono a esta parte del formulario
        return await handleValidation(state.user, profileSchema, isLast);
    },

    handleSupplement: async ({request}) => {
        let {isLast, data} = await extractData(request);

        state.bankAccount = {
            bankName: data.bankName,
            bankType: data.bankType,
            bankNumber: data.bankNumber,
            bankHolder: data.bankHolder
        }

        state.financial = {
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

        state.guarantor = {
            ...data,
            dispatchDate: parsedDispatchDate
        };
        return await handleValidation(state.guarantor, referenceSchema, isLast);
    }
}


const handleValidation = async (data, schema, isLast) => {
    const {errors} = await validateData(data, schema);
    if (errors) return fail(400, { errors: errors.fieldErrors });

    if (isLast === 'true') {
        try {
            await submitForm();
            return { submitResult: { success: true } };
        } catch (error){
            console.log("Error message to send to user: ", error.message);
            return fail(500, { submitResult: { success: false, message: error.message } });
        }
    }
}

const submitForm = async () => {
    const userCommand = new UserApiCommand(state.user);
    const commands = [
        {name: "loginData", command: new LoginApiCommand(state.login)},
        {name: "bankAccount", command: new BankAccountApiCommand(state.bankAccount)},
        {name: "financialData", command: new FinancialApiCommand(state.financial)},
        {name: "guarantorData", command: new GuarantorApiCommand(state.guarantor)}
    ];
    let executedCommands = [];
    let uuids = {};

    try {
        for (const {name, command} of commands) {
            uuids[name] = await command.execute();
            executedCommands.push(command);
        }
        userCommand.execute(uuids.loginData, uuids.bankAccount, uuids.financialData, uuids.guarantorData);
    } catch (error){
        for (const executedCommand of executedCommands.reverse()) {
            executedCommand.undo();
        }
        throw error;
    }
};
