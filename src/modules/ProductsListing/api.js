import React from 'react';
import { notify } from '../../common/components';
import { getCookie, setCookie } from '../../common/cookie';
import { useAPIState } from '../../common/hooks';
import { fetchWrapper } from './../../common';

// https://react-hot-toast.com/docs
const getProductsURL = `${process.env.REACT_APP_BASE_URL}/v1/product/all`;
const submitReviewURL = `${process.env.REACT_APP_BASE_URL}/v1/review/submit`;

export async function getProductsAPI() {
	return fetchWrapper({ url: getProductsURL });
}

export async function submitReviewAPI({ payload } = {}) {
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
				const authCookie = getCookie('_auth');
				const products = res.data?.products;

				const productsParsed = products.map(product => {
					const { reviews } = product;

					const productParsed = {
						...product,
						alreadyReviewed: false,
					};
					reviews.forEach(review => {
						if (review.user_id === authCookie) {
							productParsed.alreadyReviewed = true;
							productParsed.ownReviewInfo = review;
						}
					});
					return productParsed;
				});
				setSuccessProducts({
					products: productsParsed,
				});
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

	async function submitReview({ payload, callback } = {}) {
		setLoadingSubmitReview();

		try {
			const res = await submitReviewAPI({ payload });
			if (res.ok) {
				setSuccessSubmitReviews(res.data);
				if (res.success) {
					notify({
						message: 'Successfully saved the review',
						type: 'success',
					});
					if (callback) {
						callback();
					}
				} else {
					notify({
						message: 'Failed to save the review',
						type: 'error',
					});
				}
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
