import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('token');
	const response = await fetch(`http://localhost:4000/`, {
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: {}
	});
	const home = await response.json();

	return { home };
};

export const actions = {
	logout: async ({ cookies, request }) => {
		try {
			cookies.delete('token');
		} catch (error) {
			return fail(400);
		}

		throw redirect(302, '/auth/login');
	}
};
