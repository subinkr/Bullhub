export const load = async ({ params, cookies }) => {
	const token = cookies.get('token');
	const response = await fetch(`http://localhost:4000/boards/${params.categories}/${params.page}`, {
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: {}
	});
	const boardList = await response.json();

	return { boardList };
};
