import React from 'react';
import { useAPIState } from './common/hooks';
import { getCookie, setCookie } from './common/cookie';
import { fetchWrapper } from './common';

const loginURL = `${process.env.REACT_APP_BASE_URL}/v1/auth/login`;

/**
 * This is very minimal implementaion for token not a full auth flow
 *
 * @return  {[type]}  [return description]
 */
export async function login({ payload }) {
	return fetchWrapper({
		url: loginURL,
		options: {
			method: 'POST',
			body: payload || {},
		},
	});
}

/**
 * Get all the books
 *
 * @return  {[type]}  [return description]
 */
export function useToken() {
	const {
		setLoading: setLoadingGetToken,
		setFailure: setFailureGetToken,
		setSuccess: setSuccessGetToken,
		state,
		// resetData: recordTemperatureReset,
	} = useAPIState({
		data: null,
	});

	async function getToken({ payload } = {}) {
		setLoadingGetToken();

		try {
			const res = await login({ payload });
			if (res.ok) {
				setCookie('_auth', res.data.token);
				setSuccessGetToken(res.data);
			} else {
				setFailureGetToken();
			}
		} catch (e) {
			setFailureGetToken();
		}
	}

	return {
		getToken,
		state,
	};
}
