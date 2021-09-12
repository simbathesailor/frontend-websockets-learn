import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
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
function SubmitReviewModal(props) {
	const { onSubmitReview, item, state } = props;

	const [rating, setRating] = useState(0);
	console.log('🚀 ~ file: SubmitReviewModal.js ~ line 46 ~ SubmitReviewModal ~ rating', rating);
	const [comment, setComment] = useState('');
	console.log('🚀 ~ file: SubmitReviewModal.js ~ line 47 ~ SubmitReviewModal ~ comment', comment);

	const { isFetching } = state;

	return (
		<div>
			<Heading>What's your rating ?</Heading>
			<StarRatingSection>
				<Label>Rating</Label>
				<Rating
					onChangeRating={i => {
						setRating(i * 0.5 + 0.5);
					}}
					rating={parseFloat(resolveRatingForInternalComponent(rating))}
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
				`}
				disabled={isFetching || !rating || !comment}
				onClick={() => {
					if (onSubmitReview && rating && comment) {
						onSubmitReview({
							payload: {
								'product_id': item.id,
								rating: `${rating}`,
								'review_comment': comment,
							},
						});
					}
				}}
			>
				Submit Review
			</Button>
		</div>
	);
}

SubmitReviewModal.propTypes = {};

export default SubmitReviewModal;
