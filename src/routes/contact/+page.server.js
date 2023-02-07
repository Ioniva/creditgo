import { z } from 'zod';

const registerSchema = z
	.object({
        email: z
            .string({ required_error: 'Email is required' })
            .min(1, { message: 'Email is required' })
            .max(64, { message: 'Email must be less than 64 characters' })
            .email({ message: 'Email must be a valid email address' }),
		messageForm: z
            .string({ required_error: 'Message is required' })
            .min(1, { message: 'Message is required' })
            .max(500, { message: 'Message must be less than 500 characters' }),
	
    })
    
    export const actions = {
        default: async ({ request }) => {
            const formData = Object.fromEntries(await request.formData());
            console.log('Form Data:', formData);
            try {
                const result = registerSchema.parse(formData);
                console.log('SUCCESS');
                console.log(result);
            } catch (err) {
                const { fieldErrors: errors } = err.flatten();
                console.log(errors);
                const {...rest} = formData
                return {
                    data: rest,
                    errors
                };
            }
        }
    };
    

