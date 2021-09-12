import React from 'react';
import styled from 'styled-components';
export const ProductSectionContainer = styled.div`
	max-width: 1024px;
	background: red;
	padding: 20px 100px;
	margin: 0px auto;
	box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
	background: #fff;
	margin-top: 100px;
`;

export const ProductListItem = styled.div`
	width: 100%;
	margin-bottom: 100px;
`;
export const HeaderSection = styled.h2`
	font-size: 2.5rem;
	margin-bottom: 10px;
	text-align: left;
`;
export const SubHeaderSection = styled.p`
	text-align: left;
`;
export const RatingLayer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-top: 40px;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

export const LeftSection = styled.div`
	display: flex;
	align-items: center;
	@media (max-width: 768px) {
		width: 100%;
		justify-content: space-between;
	}
`;
export const RightSection = styled.div`
	display: flex;
	align-items: flex-end;
	@media (max-width: 768px) {
		margin-top: 20px;
		width: 100%;
		justify-content: space-between;
	}
`;
export const Button = styled.button`
	height: 40px;
	color: #797874;
	border: 1px solid #cccccc;
	box-sizing: border-box;
	box-shadow: 0px 1px 2px rgb(0 0 0 / 20%);
	border-radius: 4px;
	padding: 10px 20px;
	background: #fff;
	cursor: pointer;
	font-size: 1rem;
	${props => {
		if (props.disabled) {
			return `
      cursor: not-allowed;
      `;
		}
		return '';
	}}
	${props => props.styles || ''}
`;

export const ProductListContainer = styled.div`
	// width: 70%;
	// background: #f1b0b0;
	margin: 0px auto;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px 20px;

	@media (max-width: 768px) {
		width: 90%;
		padding: 10px 0px;
		margin: 0px auto;
	}
`;

export const SeeMoreReview = styled.a`
	font-size: 0.875rem;
	margin-right: 20px;
	cursor: pointer;
`;
export const RatingValue = styled.span`
	font-size: 2rem;
	margin-right: 12px;
	${props => props.styles || ''}
`;
