import React from 'react';
import { useAPIState } from '../../common/hooks';
import { fetchWrapper } from './../../common';

const getProductsURL = `${process.env.REACT_APP_BASE_URL}/v1/product/all`;

export async function getProductsAPI() {
	return fetchWrapper({ url: getProductsURL });
}

/**
 * Get all the books
 *
 * @return  {[type]}  [return description]
 */
export function useProducts() {
	const {
		setLoading: setLoadingProducts,
		setFailure: setFailureProducts,
		setSuccess: setSuccessProducts,
		state,
		// resetData: recordTemperatureReset,
	} = useAPIState({
		data: null,
	});

	async function getProducts() {
		setLoadingProducts();

		try {
			const res = await getProductsAPI();
			if (res.ok) {
				setSuccessProducts(res.data);
			} else {
				setFailureProducts();
			}
		} catch (e) {
			setFailureProducts();
		}
	}

	return {
		getProducts,
		state,
	};
}
