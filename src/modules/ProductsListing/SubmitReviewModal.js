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

export const ErrorSection = styled.p`
	color: #e02525;
	font-size: 0.875rem;
	margin-top: 10px;
`;
export const SubmitReviewCTA = styled.button``;

function SubmitReviewModal(props) {
	const { onSubmitReview, item, state, reviewInfo } = props;
	// const { total_rating: totalRating } = item

	const [error, setError] = useState('');
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
					onInput={e => {
						setComment(e.target.value);
					}}
					placeholder="Enter your review"
				/>
			</ReviewSection>
			{error ? <ErrorSection>{error}</ErrorSection> : null}
			<Button
				styles={css`
					margin-top: 40px;
					align-items: center;
					display: flex;
				`}
				disabled={isFetching}
				onClick={() => {
					if (!rating || !comment) {
						setError(rating ? 'Please provide the comment' : 'Please add the rating');
					}
					if (onSubmitReview && rating && comment) {
						setError('');
						onSubmitReview({
							payload: {
								'product_id': item.id,
								rating,
								'review_comment': comment?.trim() || '',
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
