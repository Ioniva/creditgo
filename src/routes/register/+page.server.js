let submissions = [];

import { fail } from '@sveltejs/kit';
import { loginSchema } from "../../lib/schemas";
import { validateData } from "../../lib/utils";

export const actions = {

    account: async ({ request }) => {
        const data = await request.formData();

        const accountData = {
            email: data.get('email'),
            password: data.get('password')
        }

        const { formData, errors } = await validateData(accountData, loginSchema);

        if (errors) {
            return fail(400, {
                data: formData,
                errors: errors.fieldErrors,
                success: false
            });
        }
        submissions.push(accountData);
        return { success: false };

    }
}
