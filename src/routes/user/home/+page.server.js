import { fail } from "@sveltejs/kit";

export const load = async (event) => {
    const token = event.cookies.get('AuthorizationToken');
    if (!token) fail(401, {error: 'Missing token'});

    const response = await fetch("http://127.0.0.1:4000/api/v1/me/solicitations", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });

    const data = await response.json();
    return {solicitations: data.solicitations.solicitations};
}
