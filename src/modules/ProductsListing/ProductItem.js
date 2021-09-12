import React, { useState } from 'react';
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
	const [showReviewModal, setShowReviewModal] = useState(false);

	const { submitReview, state } = useSubmitReview();
	console.log('🚀 ~ file: ProductItem.js ~ line 64 ~ ProductItem ~ submitReview', state);

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
						<Button
							onClick={() => {
								setShowReviewModal(true);
							}}
						>
							Add review
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
			{showReviewModal ? (
				<Modal
					bodyStyles={css`
						min-width: 600px;

						@media (max-width: 768px) {
							min-width: 100%;
							top: 0;
							bottom: 0;
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
						onSubmitReview={({ payload }) => {
							submitReview({
								payload,
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
