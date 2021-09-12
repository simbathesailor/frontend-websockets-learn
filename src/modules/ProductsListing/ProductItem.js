import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Rating from './Rating';
import PropTypes from 'prop-types';
import CloseSvg from '../../common/CloseSvg';

import {
	ProductListItem,
	HeaderSection,
	SubHeaderSection,
	RatingLayer,
	RatingValue,
	LeftSection,
	RightSection,
	SeeMoreReview,
	ButtonAddReview,
} from './styled';

export const TopSection = styled.div``;
export const SecondSection = styled.div`
	border-top: 1px solid #b9b9b9;
	margin-top: 60px;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding-top: 30px;
	position: relative;
`;
export const ReviewLabelHead = styled.h2``;
export const RatingsAndReviewSection = styled.div`
	margin-top: 20px;
`;
export const RatingsSection = styled.div`
	display: flex;
	align-items: center;
`;
export const Comments = styled.p`
	text-align: left;
	margin-top: 20px;
`;

export const CloseIcon = styled.i``;
export const Close = styled.a`
	position: absolute;
	right: 10px;
`;

export const CloseSvgContainer = styled.div`
	position: absolute;
	right: 10px;
	cursor: pointer;
`;
function ProductItem(props) {
	const { item } = props;
	const [openAllReviews, setOpenAllReviews] = useState(false);

	const { title, description, totalrating } = item;
	return (
		<ProductListItem>
			<TopSection>
				<HeaderSection>{title}</HeaderSection>
				<SubHeaderSection>{description}</SubHeaderSection>
				<RatingLayer>
					<LeftSection>
						<RatingValue>{totalrating}</RatingValue>
						<Rating
							rating={3}
							stylesFieldset={css`
								& > label:before {
									font-size: 1.25rem;
								}
								& .half:before {
									font-size: 1.25rem;
								}
							`}
						/>
					</LeftSection>
					<RightSection>
						{!openAllReviews ? (
							<SeeMoreReview
								onClick={() => {
									setOpenAllReviews(true);
								}}
							>
								See all reviews
							</SeeMoreReview>
						) : null}
						<ButtonAddReview>Add review</ButtonAddReview>
					</RightSection>
				</RatingLayer>
			</TopSection>

			{openAllReviews ? (
				<SecondSection>
					<ReviewLabelHead>Reviews</ReviewLabelHead>
					{/* <CloseIcon className="fa fa-solid fa-xmark" /> */}
					<CloseSvgContainer
						onClick={() => {
							setOpenAllReviews(false);
						}}
					>
						<CloseSvg />
					</CloseSvgContainer>
					{/* <Close
						onClick={() => {
							setOpenAllReviews(false);
						}}
					>
						CLOSE
					</Close> */}
					<RatingsAndReviewSection>
						<RatingsSection>
							<RatingValue
								styles={css`
									font-size: 1.25rem;
								`}
							>
								3.8
							</RatingValue>
							<Rating
								stylesFieldset={css`
									& > label:before {
										font-size: 1.25rem;
									}
									& .half:before {
										font-size: 1.25rem;
									}
								`}
							/>
						</RatingsSection>
						<Comments>The books is great</Comments>
					</RatingsAndReviewSection>
				</SecondSection>
			) : null}
		</ProductListItem>
	);
}

ProductItem.propTypes = {};

export default ProductItem;
