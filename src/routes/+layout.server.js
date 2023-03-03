export const load = async ({locals}) => {
    if (locals.user) return {user: locals.user, isAuthenticated: true};
    return {user: undefined, isAuthenticated: false};
}
