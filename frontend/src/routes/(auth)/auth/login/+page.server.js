import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400);
		}

		const response = await fetch('http://localhost:4000/auth/login', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password })
		});
		const result = await response.json();

		if (!result.token) {
			return fail(400);
		}

		try {
			cookies.set('token', result.token, {
				httpOnly: false,
				sameSite: 'strict',
				secure: false,
				path: '/',
				maxAge: 3600
			});
		} catch (error) {
			return fail(400);
		}

		throw redirect(303, '/');
	},

	signup: async ({ cookies, request }) => {
		const data = await request.formData();

		const username = data.get('username');
		const password = data.get('password');
		const nickname = data.get('nickname');
		const image = data.get('image') ? data.get('image') : null;

		if (!username || !password || !nickname) {
			return fail(400);
		}

		const response = await fetch('http://localhost:4000/auth/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ username, password, nickname, image })
		});
		const result = await response.json();

		if (!result.token) {
			return fail(400);
		}

		try {
			cookies.set('token', result.token, {
				httpOnly: false,
				sameSite: 'strict',
				secure: false,
				path: '/',
				maxAge: 3600
			});
		} catch (error) {
			return fail(400);
		}

		throw redirect(303, '/');
	}
};
