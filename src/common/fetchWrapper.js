import { getCookie, deleteCookie } from './cookie';
function fetchWrapper({ url, options }) {
	const finalOptions = {
		...(options || {}),
		headers: {
			...(options?.headers || {}),
			token: getCookie('_auth'),
			'Content-Type': 'application/json',
		},
	};
	if (options?.method === 'POST') {
		finalOptions.body = JSON.stringify(options?.body || {});
	}
	return fetch(url, finalOptions)
		.then(async res => {
			if (res.status === 401) {
				deleteCookie('_auth');
				if (typeof window !== 'undefined') {
					window.location.reload();
				}
			}
			const data = await res.json();
			return {
				ok: true,
				...data,
			};
		})
		.catch(e => {
			return {
				ok: false,
				success: false,
			};
		});
}

export default fetchWrapper;
