import React, { useEffect, useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { usePrevious } from '../../common/hooks';

// https://codesandbox.io/s/xpl2wjpyoq?file=/Rating.js:0-1345

function Rating({ rating, onClickStar, readonly }) {
	function onStarClickHalfStar(nextValue, prevValue, name, e) {
		console.log('🚀 ~ file: Rating.js ~ line 9 ~ onStarClickHalfStar ~ nextValue', nextValue);
		const xPos =
			(e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

		if (xPos <= 0.5) {
			nextValue -= 0.5;
		}

		// console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
		// console.log(e);
		// this.setState({rating_half_star: nextValue});

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
// function Rating(props) {
// 	const [rating, setRating] = useState(props.rating);
// 	const [tempRating, setTempRating] = useState(null);

// 	const { changeRatingImperatively, readonly = true } = props;

// 	const previousRating = usePrevious(rating);

// 	const previousTempRating = usePrevious(tempRating);

// 	function handleMouseover(rating) {
// 		if (!readonly) {
// 			setRating(rating);
// 			setTempRating(previousRating);
// 		}
// 	}

// 	useEffect(() => {
// 		setRating(rating);
// 	}, [changeRatingImperatively]);

// 	function handleMouseout() {
// 		// this.state.rating = this.state.temp_rating;
// 		// this.setState({ rating: this.state.rating });
// 		console.log('ran mouse out');
// 		if (!readonly) {
// 			setTempRating(previousTempRating);
// 		}
// 	}

// 	function rate(rating) {
// 		if (!readonly) {
// 			setRating(rating);
// 			setTempRating(rating);
// 		}
// 	}

// 	// const [rating, setRating] = useState(props.s)
// 	const { onChangeRating } = props;
// 	let stars = [];
// 	for (let i = 0; i < 10; i++) {
// 		// console.log('i', i);
// 		let klass = 'ion-ios-star-outline';
// 		const extraStyle = {
// 			color: '#000',
// 		};
// 		if (rating >= i && rating !== null) {
// 			klass = 'ion-ios-star';
// 			extraStyle.color = '#FFCD69';
// 		}
// 		stars.push(
// 			<i
// 				key={i}
// 				style={{
// 					display: 'inline-block',
// 					width: '15px',
// 					fontSize: '34px',
// 					overflow: 'hidden',
// 					direction: i % 2 === 0 ? 'ltr' : 'rtl',
// 					marginRight: i % 2 === 0 ? '0px' : '5px',
// 					cursor: readonly ? 'initial' : 'pointer',
// 					...extraStyle,
// 				}}
// 				className={klass}
// 				onMouseOver={() => handleMouseover(i)}
// 				onClick={() => {
// 					rate(i);
// 					if (onChangeRating) {
// 						onChangeRating(i);
// 					}
// 				}}
// 				onMouseOut={() => handleMouseout()}
// 			/>,
// 		);
// 	}
// 	return <div className="rating">{stars}</div>;
// }
// class Rating extends React.PureComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			rating: this.props.rating || null,
// 			temp_rating: null,
// 		};
// 	}

// 	handleMouseover(rating) {
// 		this.setState(prev => ({
// 			rating,
// 			temp_rating: prev.rating,
// 		}));
// 	}

// 	handleMouseout() {
// 		// this.state.rating = this.state.temp_rating;
// 		// this.setState({ rating: this.state.rating });
// 		this.setState(prev => ({
// 			rating: prev.temp_rating,
// 		}));
// 	}

// 	rate(rating) {
// 		this.setState({
// 			rating,
// 			temp_rating: rating,
// 		});
// 	}

// 	render() {
// 		const { onChangeRating } = this.props;
// 		const { rating } = this.state;
// 		let stars = [];
// 		for (let i = 0; i < 10; i++) {
// 			// console.log('i', i);
// 			let klass = 'ion-ios-star-outline';
// 			const extraStyle = {
// 				color: '#000',
// 			};
// 			if (this.state.rating >= i && this.state.rating !== null) {
// 				klass = 'ion-ios-star';
// 				extraStyle.color = '#FFCD69';
// 			}
// 			stars.push(
// 				<i
// 					key={i}
// 					style={{
// 						display: 'inline-block',
// 						width: '15px',
// 						fontSize: '34px',
// 						overflow: 'hidden',
// 						direction: i % 2 === 0 ? 'ltr' : 'rtl',
// 						marginRight: i % 2 === 0 ? '0px' : '5px',
// 						...extraStyle,
// 					}}
// 					className={klass}
// 					onMouseOver={() => this.handleMouseover(i)}
// 					onClick={() => {
// 						this.rate(i);
// 						if (onChangeRating) {
// 							onChangeRating(i);
// 						}
// 					}}
// 					onMouseOut={() => this.handleMouseout()}
// 				/>,
// 			);
// 		}
// 		return <div className="rating">{stars}</div>;
// 	}
// }

export default Rating;
