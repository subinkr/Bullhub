import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(300, '/auth/login');
	}
	const response = await fetch(
		`http://localhost:4000/boards/board_id/${params.boardId}/user_id/${params.userId}`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	const board = await response.json();

	return { board };
};

export const actions = {
	modify: async ({ params, cookies, request }) => {
		const token = cookies.get('token');
		if (!token) {
			throw redirect(300, '/auth/login');
		}

		const data = await request.formData();

		const title = data.get('title');
		const content = data.get('content');
		let category = data.get('category');
		const image = data.get('image') ? data.get('image') : null;

		if (!title || !content || !category) {
			return fail(400);
		}

		switch (category) {
			case '공지사항':
				category = 'ANNOUNCEMENT';
				break;
			case '국내주식 게시판':
				category = 'DOMESTIC';
				break;
			case '해외주식 게시판':
				category = 'FOREIGN';
				break;
			case '비트코인 게시판':
				category = 'BITCOIN';
				break;
		}

		const response = await fetch(`http://localhost:4000/boards/board_id/${params.boardId}`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ title, content, category, image })
		});
		const result = await response.json();

		throw redirect(303, `/boards/board_id/${params.boardId}`);
	}
};
