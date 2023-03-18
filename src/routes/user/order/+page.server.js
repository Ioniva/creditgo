import { fail, redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const user = event.locals.user;
    if (!user) throw redirect(307, "/login");
    return user;
}


export const actions = {
    default: async (event) => {
        const { amount, paymentDays } =  Object.fromEntries(await event.request.formData());
        if (!amount || !paymentDays) return fail(400, {error: 'Missing amount or paymentDays'});

        const token = event.cookies.get('AuthorizationToken');
        if (!token) return fail(401, {error: 'Missing token'});

        const data = {
            "amount": parseInt(amount),
            "paymentDays": parseInt(paymentDays)
        };

        const response = await fetch ('http://127.0.0.1:4000/api/v1/me/solicitations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Authorization': token },
            body: JSON.stringify(data)
        });
        if (!response) return fail(500, {error: 'No response from server'});
    }
};
