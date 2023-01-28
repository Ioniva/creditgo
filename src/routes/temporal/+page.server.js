import { fail } from '@sveltejs/kit';
import { loginSchema } from "../../lib/schemas";
import { validateData } from "../../lib/utils";

let loginData;

export const actions = {

    login: async ({ request }) => {
        const data = await request.formData();

        loginData = {
            email: data.get('email'),
            password: data.get('password')
        }


        const { formData, errors } = await validateData(loginData, loginSchema);

        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors,
                success: false
            });
        } else {
            return { isLast: data.isLast ?? true };
        }
    },

    example: async () => {
        console.log("login form data:", loginData)
    }
}
