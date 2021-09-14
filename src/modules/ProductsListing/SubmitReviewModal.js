import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { Loader } from '../../common/components';
import Rating from './Rating';
import { Button } from './styled';

export const Heading = styled.h1`
	margin-bottom: 40px;
`;
export const StarRatingSection = styled.div`
	font-size: 1.5rem;
`;
export const ReviewSection = styled.div`
	margin-top: 40px;
	display: flex;
	flex-direction: column;
`;
export const ReviewBox = styled.textarea`
	min-height: 100px;
	min-width: 100%;
	padding: 10px;
	font-size: 0.875rem;
`;
export const Label = styled.p`
	font-size: 1.5rem;
	margin-bottom: 30px;
`;
export const SubmitReviewCTA = styled.button``;

function resolveRatingForInternalComponent(val) {
	const parsedNumber = parseFloat(val);

	if (!parsedNumber) {
		return 0;
	}
	const steps = parsedNumber / 0.5;

	return steps - 1;

	//if(steps)
}

function getRatingForComponent(value) {
	if (parseFloat()) return parseFloat(value) ? parseFloat(value) * 2 - 1 : 0;
}
function SubmitReviewModal(props) {
	const { onSubmitReview, item, state, reviewInfo } = props;
	// const { total_rating: totalRating } = item

	const [rating, setRating] = useState(() => {
		const ratingOwn = parseFloat(reviewInfo?.rating || 0);
		return ratingOwn;
	});

	const [comment, setComment] = useState(() => {
		return reviewInfo?.comment || '';
	});

	const { isFetching } = state;

	return (
		<div>
			<Heading>What's your rating ?</Heading>
			<StarRatingSection>
				<Label>Rating</Label>
				<Rating
					readonly={false}
					onClickStar={({ rating }) => {
						setRating(rating);
					}}
					rating={rating}
				/>
			</StarRatingSection>
			<ReviewSection>
				<Label>Review</Label>

				<ReviewBox
					value={comment}
					onChange={e => {
						setComment(e.target.value);
					}}
					placeholder="Enter your review"
				/>
			</ReviewSection>
			<Button
				styles={css`
					margin-top: 40px;
					align-items: center;
					display: flex;
				`}
				disabled={isFetching || !rating || !comment}
				onClick={() => {
					if (onSubmitReview && rating && comment) {
						onSubmitReview({
							payload: {
								'product_id': item.id,
								rating,
								'review_comment': comment,
							},
						});
					}
				}}
			>
				{isFetching ? <Loader /> : '	Submit Review'}
			</Button>
		</div>
	);
}

SubmitReviewModal.propTypes = {};

export default SubmitReviewModal;
