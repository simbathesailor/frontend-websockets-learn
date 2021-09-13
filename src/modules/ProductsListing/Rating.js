import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

function Rating({ rating, onClickStar, readonly }) {
	function onStarClickHalfStar(nextValue, prevValue, name, e) {
		const xPos =
			(e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

		if (xPos <= 0.5) {
			nextValue -= 0.5;
		}

		if (onClickStar) {
			onClickStar({ rating: nextValue });
		}
	}

	return (
		<StarRatingComponent
			name="app6"
			starColor="#ffb400"
			emptyStarColor="#ffb400"
			value={rating}
			onStarClick={(...rest) => {
				if (!readonly) {
					onStarClickHalfStar(...rest);
				}
			}}
			renderStarIcon={(index, value) => {
				return (
					<span
						style={{
							cursor: readonly ? 'initial' : 'pointer',
							fontSize: '1.5rem',
						}}
					>
						<i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
					</span>
				);
			}}
			renderStarIconHalf={() => {
				return (
					<span
						style={{
							cursor: readonly ? 'initial' : 'pointer',
							fontSize: '1.5rem',
						}}
					>
						<span style={{ position: 'absolute' }}>
							<i className="far fa-star" />
						</span>
						<span>
							<i className="fas fa-star-half" />
						</span>
					</span>
				);
			}}
		/>
	);
}

export default Rating;
