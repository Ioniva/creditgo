import { redirect } from '@sveltejs/kit';

export const POST = (event) => {
    event.cookies.delete('AuthorizationToken');
    throw redirect(302, '/login');
}
