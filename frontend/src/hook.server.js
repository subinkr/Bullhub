export async function handle({ event, resolve }) {
	if (event.url.pathname.startsWith('auth/logout')) {
		event.cookies.delete('token');
	}

	return resolve(event);
}
