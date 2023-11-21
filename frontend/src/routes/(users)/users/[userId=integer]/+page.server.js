import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const token = cookies.get('token');
	const response = await fetch(`http://localhost:4000/users/${params.userId}`, {
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: {}
	});
	const user = await response.json();

	return { user };
};

export const actions = {
	delete: async ({ cookies, request }) => {
		const token = cookies.get('token');
		if (!token) {
			throw redirect(302, '/auth/login');
		}
		const response = await fetch(`http://localhost:4000/users/${params.userId}`, {
			method: 'delete',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		const user = await response.json();

		throw redirect(302, '/auth/login');
	}
};
