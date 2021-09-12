export function getCookie(cname) {
	const name = `${cname}=`;
	const ca = document.cookie.split(';');
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

export function deleteCookie(cname) {
	const domain = process.env.REACT_APP_ROOT_DOMAIN;
	document.cookie = `${cname}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
}

export function setCookie(cname, cvalue, extime) {
	const cvalueEncoded = encodeURIComponent(cvalue);
	let expires = '';

	const domain = process.env.REACT_APP_ROOT_DOMAIN;
	if (extime) {
		const d = new Date();
		d.setTime(d.getTime() + extime * 1000);
		expires = d.toGMTString();
	}
	if (window.location.href.indexOf('http:') > -1) {
		document.cookie = `${cname}=${cvalueEncoded};path=/;${
			expires ? `expires=${expires};` : ''
		} domain=${domain}`;
	} else {
		document.cookie = `${cname}=${cvalueEncoded};path=/;${
			expires ? `expires=${expires};` : ''
		} domain=${domain};secure`;
	}
}
