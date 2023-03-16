import { z } from 'zod';
import banks from './content/banks.js'

const accountSchema = z.object({
    cedula: z.string()
        .length(11, { message: 'Must be exactyly 10 characters long' })
        .regex(/^\d{6}[-]\d{4}$/, { message: 'Invalid format. For example, 123456-7890' }),
    email: z.string().email(),
    repeatEmail: z.string().email(),
    password: z.string().min(9),
    repeatPassword: z.string().min(9),
    phone: z.string().min(10).max(15),
    repeatPhone: z.string().min(10).max(15),
    meetplace: z.enum(['facebook', 'google', 'referidos', 'otros']).optional(),
    termCondition: z.boolean().refine((flag) => flag === true, { message: 'Terms conditions are required' }),
    personalInfo: z.boolean().refine((flag) => flag === true, { message: 'Authorization is required' })
})
    // TODO: Mostrar estos errores al cliente
    // TODO: Mandar al cliente tanto los fieldErrors como formErrors
    .refine((data) => data.password === data.repeatPassword, { message: { confirmPassword: 'Password dont match' } })
    .refine((data) => data.email === data.repeatEmail, { message: 'Email does not match' })
    .refine((data) => data.phone === data.repeatPhone, { message: 'Phone number does not match' })


const profileSchema = z.object({
    name: z.string().min(1).max(140),
    surname: z.string().min(1).max(140),
    // TODO: Verificar si es mayor de edad
    birthDate: z.date(),
    genre: z.enum(['male', 'female', 'other']),
    // TODO: Utilizar los valores de la API
    maritalStatus: z.enum(['S', 'U', 'C', 'D', 'V']),
    children: z.number().nonnegative(),
    department: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    zip: z.string().length(6).regex(/^\d{6}$/),
    // TODO: Añadir una API u otro mecanismo para actualizar automáticamente
    // NOTE: Utilizar native enums
    dispatchPlace: z.enum(['Bogotá', 'Medellín', 'Cali', 'Barranquilla']),
    // TODO: Definir una formato
    dispatchDate: z.date()
})

const supplementSchema = z.object({
    // TODO: Utilizar los valores de la API
    // ...Utilizar native enums
    bankName: z.enum(banks),
    bankType: z.enum(['A', 'C']),
    bankNumber: z.string().length(7).regex(/^\d{7}$/),
    bankHolder: z.string().min(1).max(16),
    employeeType: z.enum(['E', 'I', 'P', 'D', 'R']),
    netMonthlyIncome: z.string().min(1),
    netMonthlyExpense: z.string(),
    additionalIncome: z.string()
})

const referenceSchema = z.object({
    employeeType: z.enum(['E', 'I', 'P', 'D', 'R']),
    // primeros seis  : fecha de nacimiento en el formato 'ddmmyy'
    // últimos cuatro : números aleatorios asignados por el gobierno
    cedula: z.string()
        .length(11, { message: 'Must be exactyly 10 characters long' })
        .regex(/^\d{6}[-]\d{4}$/, { message: 'Invalid format. For example, 123456-7890' }),
    name: z.string().min(1).max(140),
    surname: z.string().min(1).max(140),
    phone: z.string().min(10).max(15),
    // TODO: Añadir una API u otro mecanismo para actualizar automáticamente
    // ...Utilizar native enums
    dispatchPlace: z.enum(['Bogotá', 'Medellín', 'Cali', 'Barranquilla']),
    dispatchDate: z.date(),
    department: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    zip: z.string().length(6).regex(/^\d{6}$/)
})

export { accountSchema, profileSchema, supplementSchema, referenceSchema };
