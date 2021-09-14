import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
export const LoaderContainer = styled.svg`
	transform: scale(0.5);
`;

function Loader(props) {
	return (
		<LoaderContainer
			width={120}
			height={30}
			xmlns="http://www.w3.org/2000/svg"
			fill="#000"
			{...props}
		>
			<circle cx={15} cy={15} r={15}>
				<animate
					attributeName="r"
					from={15}
					to={15}
					begin="0s"
					dur="0.8s"
					values="15;9;15"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="fill-opacity"
					from={1}
					to={1}
					begin="0s"
					dur="0.8s"
					values="1;.5;1"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx={60} cy={15} r={9} fillOpacity={0.3}>
				<animate
					attributeName="r"
					from={9}
					to={9}
					begin="0s"
					dur="0.8s"
					values="9;15;9"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="fill-opacity"
					from={0.5}
					to={0.5}
					begin="0s"
					dur="0.8s"
					values=".5;1;.5"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
			<circle cx={105} cy={15} r={15}>
				<animate
					attributeName="r"
					from={15}
					to={15}
					begin="0s"
					dur="0.8s"
					values="15;9;15"
					calcMode="linear"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="fill-opacity"
					from={1}
					to={1}
					begin="0s"
					dur="0.8s"
					values="1;.5;1"
					calcMode="linear"
					repeatCount="indefinite"
				/>
			</circle>
		</LoaderContainer>
	);
}

export default Loader;
