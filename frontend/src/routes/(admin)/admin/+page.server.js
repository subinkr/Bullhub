export const load = async ({ params, cookies }) => {
	const token = cookies.get('token');
	const response = await fetch(`http://localhost:4000/admin`, {
		headers: token
			? {
					Authorization: `Bearer ${token}`
			  }
			: {}
	});
	const userList = await response.json();

	return { userList };
};
