import styled, { css } from 'styled-components';

export const ModalMainContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	top: 0;
	z-index: 100;
	${props => props.styles || ''}
`;

export const ModalBackdrop = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: #000;
	opacity: 0.56;
	display: flex;
	justify-content: center;
	align-items: center;
	${props => props.styles || ''}
`;

export const closeModalAct = css`
	position: fixed;
	top: 20px;
	right: 32px;
	color: #000;
	z-index: 10;
	font-size: 18px;
	&:hover {
		color: #000;
	}
	i {
		margin: 0;
		padding: 0;
		box-shadow: none;
	}
`;
export const closeActInside = css`
	${closeModalAct};
	position: absolute;
	right: 20px;
`;

export const ModalHeader = styled.div`
	position: sticky;
	top: 0;
	width: 100%;
	height: 72px;
	padding: 12px 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 72px;
	/* background-color: #f3f3f3; */
	background-color: #f7f7f6;
	border-bottom: 1px solid #e9e9e9;
	z-index: 1;
	${props => props.styles || ''}
`;

export const ModalHeaderComponent = styled.div`
	text-align: center;
`;

export const ModalHeaderTitle = styled(ModalHeaderComponent)`
	font-size: 1.25rem;
	font-weight: 600;
	@media (max-width: 768px) {
		font-size: 16px;
		font-weight: 500;
	}
`;

export const defaultCloseBtn = css`
	background: #fff;
	padding: 14px;
	border-radius: 50%;
	cursor: pointer;
	color: #000;
	box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.06);
	position: absolute;
	top: 10px;
	right: 10px;
	z-index: 10;
`;

export const BackButtonContainer = styled.div`
	display: flex;
	align-items: center;
	padding: 16px;
	font-size: 12px;
	padding: 0px;
	border-bottom: 2px solid transparent;
	color: rgba(0, 0, 0, 0.5);
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: #000;
	i {
		color: #0697a2;
	}
	&:hover,
	&:focus {
		color: #0697a2;
		outline: none;
	}
	@media (max-width: 768px) {
		font-size: 16px;
		font-weight: 500;
		i {
			color: #000000;
		}
		span {
			display: none;
		}
	}
`;

export const defaultBackBtn = css`
	cursor: pointer;
	color: #000;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 30px;
	&:hover,
	&:focus {
		text-decoration: none;
	}
	z-index: 10;
`;

export const ModalBody = styled.div`
	min-width: 350px;
	padding: 48px;
	background-color: #fff;
	opacity: 1;
	position: absolute;
	border-radius: 5px;
	box-shadow: var(--box-shadow);
	${({ size }) =>
		size === 'full' &&
		css`
			height: 100vh;
			width: 100vw;
		`}
	${props => props.styles || ''}
`;

export const ModalChildren = styled.div`
	height: ${props => (props.header ? 'calc(100% - 72px)' : '100%')};
	width: 100%;
	${props => props.childrenStyles || ''}
`;

export const CloseSequoiaBtn = styled.i`
	position: absolute;
	right: 32px;
	top: 20px;
	cursor: pointer;
	box-shadow: none;
	${props => props.styles || ''}
`;
