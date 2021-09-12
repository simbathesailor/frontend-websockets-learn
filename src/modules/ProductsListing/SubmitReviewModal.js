import React from 'react';
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
function SubmitReviewModal(props) {
	return (
		<div>
			<Heading>What's your rating ?</Heading>
			<StarRatingSection>
				<Label>Rating</Label>
				<Rating />
			</StarRatingSection>
			<ReviewSection>
				<Label>Review</Label>

				<ReviewBox placeholder="Enter your review" />
			</ReviewSection>
			<Button
				styles={css`
					margin-top: 40px;
				`}
			>
				Submit Review
			</Button>
		</div>
	);
}

SubmitReviewModal.propTypes = {};

export default SubmitReviewModal;
