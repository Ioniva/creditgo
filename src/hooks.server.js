import jwt from 'jsonwebtoken'
import {redirect} from '@sveltejs/kit';

export const handle = async ({event, resolve}) => {
    const authCookie = event.cookies.get('AuthorizationToken');
    if (authCookie) {
        const token = authCookie.replace('bearer ', '');
        try {
            const payload = jwt.verify(token, import.meta.env.VITE_JWT_SECRET);
            event.locals.user = payload;
        }
        catch (err) {
            throw redirect (307, "/login");
        }
    }
    return await resolve(event);
}
