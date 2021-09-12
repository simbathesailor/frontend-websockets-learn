import React from 'react';
import { notify } from '../../common/components';
import { useAPIState } from '../../common/hooks';
import { fetchWrapper } from './../../common';

// https://react-hot-toast.com/docs
const getProductsURL = `${process.env.REACT_APP_BASE_URL}/v1/product/all`;
const submitReviewURL = `${process.env.REACT_APP_BASE_URL}/v1/review/submit`;

export async function getProductsAPI() {
	return fetchWrapper({ url: getProductsURL });
}

export async function submitReviewAPI({ payload } = {}) {
	console.log('🚀 ~ file: api.js ~ line 15 ~ submitReviewAPI ~ payload', payload);
	return fetchWrapper({
		url: submitReviewURL,
		options: {
			body: payload,
			method: 'POST',
		},
	});
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

/**
 * Get all the books
 *
 * @return  {[type]}  [return description]
 */
export function useSubmitReview() {
	const {
		setLoading: setLoadingSubmitReview,
		setFailure: setFailureSubmitReview,
		setSuccess: setSuccessSubmitReviews,
		state,
		// resetData: recordTemperatureReset,
	} = useAPIState({
		data: null,
	});

	async function submitReview({ payload } = {}) {
		setLoadingSubmitReview();

		try {
			const res = await submitReviewAPI({ payload });
			if (res.ok) {
				setSuccessSubmitReviews(res.data);
				notify({
					message: 'Successfully saved the review',
					type: 'success',
				});
			} else {
				setFailureSubmitReview();
			}
		} catch (e) {
			setFailureSubmitReview();
		}
	}

	return {
		submitReview,
		state,
	};
}
