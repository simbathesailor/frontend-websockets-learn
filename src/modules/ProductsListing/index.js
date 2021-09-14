import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductItem from './ProductItem';
import { useProducts } from './api';
import PageLoader from '../../common/components/Loader/PageLoader';

import PropTypes from 'prop-types';

export const ProductSectionContainer = styled.div`
	max-width: 900px;
	padding: 20px 100px;
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 0px auto;
	box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
	background: #fff;
	margin-top: 100px;
	min-height: 70vh;
	@media (max-width: 768px) {
		padding: 20px 10px;
		width: 90%;
	}
`;

export const ProductListContainer = styled.div`
	// width: 70%;
	// background: #f1b0b0;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 60px 20px;

	@media (max-width: 768px) {
		width: 90%;
		padding: 20px 0px;
		margin: 0px auto;
	}
`;

export const SeeMoreReview = styled.a`
	font-size: 0.875rem;
	margin-right: 20px;
`;
export const RatingValue = styled.span`
	font-size: 2rem;
	margin-right: 12px;
`;

function ProductListing(props) {
	const { getProducts, state: stateProducts } = useProducts();

	useEffect(() => {
		getProducts();
	}, []);

	const products = stateProducts?.data?.products || [];

	return (
		<ProductSectionContainer>
			{stateProducts?.isFetching ? <PageLoader /> : null}
			{stateProducts?.isFetched ? (
				<ProductListContainer>
					{products.map(product => {
						return (
							<ProductItem
								key={product.id}
								item={product}
								getProducts={getProducts}
							/>
						);
					})}
				</ProductListContainer>
			) : null}
		</ProductSectionContainer>
	);
}

ProductListing.propTypes = {};

export default ProductListing;
