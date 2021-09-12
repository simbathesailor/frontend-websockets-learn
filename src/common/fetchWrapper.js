function fetchWrapper({ url, options }) {
	return fetch(url, options || {})
		.then(async res => {
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
