import { string, z } from 'zod';

export const loginSchema = z.object({
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Email must be a valid email' }),
    password: z.string({ required_error: 'Password is required' })
})

export const profileSchema = z.object({
    // TODO: Investigar una API para verificar los números
    phone: z.number({ required_error: 'Phone is required' })
        .min(10, { message: 'Must be 10 or more characters long' })
        .max(15, { message: 'Must be 15 or fewer characters long' }),

    name: z.string({ required_error: 'First name is required' })
        .max(140, { message: 'Must be 140 or fewer characters long' }),
    surname: z.string({ required_error: 'Last name is required' })
        .max(140, { message: 'Must be 140 or fewer characters long' }),
    // TODO: Verificar si es mayor de edad
    birthDate: z.date({ required_error: 'Please select a date', invalid_type_error: 'That is not a date!' })
        .min(new Date('1950-01-01'), { message: 'Too old' })
        .max(new Date(), { message: 'Too young!' }),
    gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
    // TODO: Utilizar los valores de la API
    maritalStatus: z.enum(['S', 'C', 'L', 'D', 'V']),
    children: z.number({ message: 'Must be a valid number' })
        .nonnegative({ message: 'Must be 0 or larger' }),
    department: z.string({ required_error: 'Department is required' })
        .max(255, { message: 'Must be 255 or fewer characters long' }),
    city: z.string({ required_error: 'City is required' })
        .max(255, { message: 'Must be 255 or fewer characters long' }),
    zip: z.string({ required_error: 'ZIP code is required' })
        .length(6, { message: 'Must be exactly 6 characters long' })
        .regex(/^\d{5}$/),
    // primeros seis  : fecha de nacimiento en el formato 'ddmmyy'
    // últimos cuatro : números aleatorios asignados por el gobierno
    cedula: string({ required_error: 'Cedula is required' })
        .length(10, { message: 'Must be exactyly 10 characters long' })
        .regex(/^\d{6}[-]\d{4}$/),
    // TODO: Añadir una API u otro mecanismo para actualizar automáticamente
    // ...Utilizar native enums
    dispatchPlace: z.enum(['Bogotá', 'Medellín', 'Cali', 'Barranquilla']),
    dispatchDate: z.date({ required_error: 'Please select a date', invalid_type_error: 'That is not a date!' })
})

// ...Utilizar native enums
const meetplaceSchema = z.array(z.enum(['facebook', 'google', 'referidos', 'otros']));

const agreementSchema = z.object({
    termCondition: z.boolean(),
    personalInfo: z.boolean()
})

const bankAccountSchema = z.object({
    // TODO: Utilizar los valores de la API
    // ...Utilizar native enums
    bankName: z.enum(['Helm', 'Skandia', 'Citybank', 'Confiar', 'BBVA']),
    bankType: z.enum(['ahorro', 'corriente'], { required_error: 'Bank type is required' }),
    bankNumber: z.string({ required_error: 'Bank number is required' })
        .length(7, { message: 'Must be exactyly 7 characters long' })
        .regex(/^\d{7}$/),
    holder: z.string({ required_error: 'Holder name is required' })
        .max(16, { message: 'Must be 16 or fewer characters long' })
})

const financialSchema = z.object({
    employeeType: z.enum(['empleado', 'independiente', 'pensionado', 'desmpleado', 'prestador'], { required_error: 'Employee type is required' }),
    // netMonthlyIncome: z.regex(/^\d{1,18}(,\d{0,4})?$/, { required_error: 'Monthly income is required' }),
    // netMonthlyExpense: z.regex(/^\d{1,18}(,\d{0,4})?$/),
    // additionalIncome: z.regex(/^\d{1,18}(,\d{0,4})?$/)
})

const guarantorSchema = z.object({
    employeeType: z.enum(['empleado', 'independiente', 'pensionado', 'desmpleado', 'prestador'], { required_error: 'Employee type is required' }),
    // primeros seis  : fecha de nacimiento en el formato 'ddmmyy'
    // últimos cuatro : números aleatorios asignados por el gobierno
    cedula: string({ required_error: 'Cedula is required' })
        .length(10, { message: 'Must be exactyly 10 characters long' })
        .regex(/^\d{6}[-]\d{4}$/),
    name: z.string({ required_error: 'First name is required' })
        .max(140, { message: 'Must be 140 or fewer characters long' }),
    surname: z.string({ required_error: 'Last name is required' })
        .max(140, { message: 'Must be 140 or fewer characters long' }),
    phone: z.number({ required_error: 'Phone is required' })
        .min(10, { message: 'Must be 10 or more characters long' })
        .max(15, { message: 'Must be 15 or fewer characters long' }),
    // TODO: Añadir una API u otro mecanismo para actualizar automáticamente
    // ...Utilizar native enums
    dispatchPlace: z.enum(['Bogotá', 'Medellín', 'Cali', 'Barranquilla']),
    dispatchDate: z.date({ required_error: 'Please select a date', invalid_type_error: 'That is not a date!' }),
    department: z.string({ required_error: 'Department is required' })
        .max(255, { message: 'Must be 255 or fewer characters long' }),
    city: z.string({ required_error: 'City is required' })
        .max(255, { message: 'Must be 255 or fewer characters long' }),
    zip: z.string({ required_error: 'ZIP code is required' })
        .length(6, { message: 'Must be exactly 6 characters long' })
        .regex(/^\d{5}$/),
})
