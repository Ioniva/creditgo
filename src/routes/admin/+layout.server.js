import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    if (!event.locals.user) throw redirect(307, "/login");
    const {roles} = event.locals.user;
    if (!roles.includes('A')) {
        throw redirect (307, "/login");
    }
}
