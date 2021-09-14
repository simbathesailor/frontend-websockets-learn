import React, { useState, useMemo } from 'react';

import { Loader } from '../../common/components';
import { getCookie, setCookie } from '../../common/cookie';
import styled, { css } from 'styled-components';
import Rating from './Rating';
import PropTypes from 'prop-types';
import { Modal } from '../../common/components';
import CloseSvg from '../../common/CloseSvg';
import SubmitReviewModal from './SubmitReviewModal';
import { useSubmitReview } from './api';

import {
	ProductListItem,
	HeaderSection,
	SubHeaderSection,
	RatingLayer,
	RatingValue,
	LeftSection,
	RightSection,
	SeeMoreReview,
	Button,
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
	margin-top: 40px;
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

export const NoReview = styled.p``;
function ProductItem(props) {
	const { item, getProducts } = props;

	// console.log('🚀 ~ file: ProductItem.js ~ line 58 ~ ProductItem ~ item', item);
	const [openAllReviews, setOpenAllReviews] = useState(false);

	const { title, description, total_rating: totalRating, alreadyReviewed, ownReviewInfo } = item;
	const [showReviewModal, setShowReviewModal] = useState(false);

	const { submitReview, state } = useSubmitReview();
	const parsedRating = parseFloat(totalRating || 0);

	const reviews = item.reviews;

	return (
		<ProductListItem>
			<TopSection>
				<HeaderSection>{title}</HeaderSection>
				<SubHeaderSection>{description}</SubHeaderSection>
				<RatingLayer>
					<LeftSection>
						{parsedRating ? (
							<RatingValue>{parsedRating}</RatingValue>
						) : (
							<NoReview>No reviews yet</NoReview>
						)}
						{parseFloat(parsedRating) ? (
							<Rating
								readonly
								rating={parsedRating || 0}
								stylesFieldset={css`
									& > label:before {
										font-size: 1.25rem;
									}
									& .half:before {
										font-size: 1.25rem;
									}
								`}
							/>
						) : null}
					</LeftSection>
					<RightSection>
						<SeeMoreReview
							onClick={() => {
								setOpenAllReviews(true);
							}}
						>
							{!openAllReviews && reviews?.length ? 'See all reviews' : ''}
						</SeeMoreReview>

						<Button
							onClick={() => {
								setShowReviewModal(true);
							}}
						>
							{alreadyReviewed ? 'Edit review' : 'Add review'}
						</Button>
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

					{(reviews || []).map(review => {
						const { id, comment, rating } = review;
						const parsedRatingIndividualRating = parseFloat(rating);
						return (
							<RatingsAndReviewSection key={id}>
								<RatingsSection>
									<RatingValue
										styles={css`
											font-size: 1.25rem;
										`}
									>
										{parsedRatingIndividualRating}
									</RatingValue>
									<Rating
										rating={parsedRatingIndividualRating}
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
								<Comments>{comment}</Comments>
							</RatingsAndReviewSection>
						);
					})}
				</SecondSection>
			) : null}
			{showReviewModal ? (
				<Modal
					bodyStyles={css`
						min-width: 600px;

						@media (max-width: 768px) {
							min-width: 90%;

							bottom: 40px;

							padding-top: 120px;
						}
					`}
					show={showReviewModal}
					setShow={setShowReviewModal}
					showCloseAct
					closePlacement="inside"
					closeModal={() => {
						setShowReviewModal(false);
					}}
				>
					<SubmitReviewModal
						item={item}
						reviewInfo={ownReviewInfo}
						onSubmitReview={({ payload }) => {
							submitReview({
								payload,
								callback: () => {
									getProducts();
									setShowReviewModal(false);
								},
							});
						}}
						state={state}
					/>
				</Modal>
			) : null}
		</ProductListItem>
	);
}

ProductItem.propTypes = {};

export default ProductItem;
