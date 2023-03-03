import jwt from 'jsonwebtoken'
import {redirect} from '@sveltejs/kit';

export const handle = async ({event, resolve}) => {
    const authCookie = event.cookies.get('AuthorizationToken');
    if (authCookie) {
        const token = authCookie.replace('Bearer ', '');
        try {
            const {id, email} = jwt.verify(token, import.meta.env.VITE_JWT_SECRET);
            const payload = {id, email};
            event.locals.user = payload;
        }
        catch (err) {
            throw redirect (307, "/login");
        }
    }
    return await resolve(event);
}
