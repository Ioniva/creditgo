let submissions = [];

export const actions = {
    account: async ({ request }) => {
        const data = await request.formData();

        const formResult = {
            email: data.get('email'),
            password: data.get('password')
        }

        submissions.push(formResult);
        console.log(submissions);
    }
}
