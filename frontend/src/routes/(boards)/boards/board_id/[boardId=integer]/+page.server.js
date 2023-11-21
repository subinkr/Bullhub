import { redirect } from '@sveltejs/kit';

export const load = async ({ params, cookies }) => {
	const token = cookies.get('token');
	if (!token) {
		throw redirect(300, '/auth/login');
	}
	const response = await fetch(`http://localhost:4000/boards/board_id/${params.boardId}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	const board = await response.json();

	return { board };
};
