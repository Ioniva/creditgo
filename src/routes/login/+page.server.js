import FetchUtil from '../../lib/utils/fetchUtil.js';
import { redirect } from '@sveltejs/kit';

const SIGNIN_URL = "http://127.0.0.1:4000/api/v1/auth/signin";

export const actions = {
    default: async (event) => {
        const { email, password } =  Object.fromEntries(await event.request.formData());
        const {token} = await FetchUtil.post(SIGNIN_URL, { email, password });
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
