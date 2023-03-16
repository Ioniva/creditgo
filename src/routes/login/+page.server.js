import { fail, redirect } from '@sveltejs/kit';

const SIGNIN_URL = "http://127.0.0.1:4000/api/v1/auth/signin";

export const actions = {
    default: async (event) => {
        const { email, password } =  Object.fromEntries(await event.request.formData());
        console.log("email: ", email, "password: ", password);

        const response = await fetch (SIGNIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        if (!response) return fail(500, {error: 'No response from server'});

        const {token} = await response.json();
        if (!token) return fail(500, {error: 'No token from server'});

        event.cookies.set('AuthorizationToken', `Bearer ${token}`, {
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 1 day
        });
        throw redirect(302, '/user/dashboard');
    }
}
