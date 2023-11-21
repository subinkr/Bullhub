import { redirect } from '@sveltejs/kit';
import { fail } from 'assert';

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
	modify: async ({ params, cookies, request }) => {
		const token = cookies.get('token');
		if (!token) {
			throw redirect(300, '/auth/login');
		}

		const data = await request.formData();

		const nickname = data.get('nickname');
		const image = data.get('image') ? data.get('image') : null;

		if (!nickname) {
			return fail(400);
		}

		const response = await fetch(`http://localhost:4000/users/${params.userId}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ nickname, image })
		});
		const result = await response.json();

		throw redirect(303, `/users/${params.userId}`);
	}
};
