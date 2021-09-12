import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import CloseSvg from '../../CloseSvg';

// Import components
// import { CloseBtn, Button } from 'components';

// Import styles
import {
	ModalMainContainer,
	ModalBackdrop,
	ModalBody,
	closeModalAct,
	closeActInside,
	defaultCloseBtn,
	ModalHeader,
	ModalHeaderTitle,
	ModalHeaderComponent,
	BackButtonContainer,
	defaultBackBtn,
	ModalChildren,
} from './styled';

const NOOP = () => {};
// export const BackBtn = ({ clickHandler, styles }) => (
export const CloseContainer = styled.div`
	position: absolute;
	right: 20px;
	top: 20px;
`;
// 	<Button onClick={clickHandler || NOOP} btnType="link" styles={styles} data-testid="back_button">
// 		<BackButtonContainer>
// 			<i className="seq seq-angle-left" />
// 			<span>Back</span>
// 		</BackButtonContainer>
// 	</Button>
// );

function useSetupHook({ showInitial = false } = {}) {
	const [show, setShow] = React.useState(showInitial);
	return {
		show,
		setShow,
	};
}

function Modal({
	id = 'portal-root',
	show,
	children,
	size = '',
	closeModal,
	handleClickOutside,
	showCloseAct,
	showBackAct,
	headerComponent,
	closePlacement,
	closeBtnType,
	bodyStyles,
	modalContainerStyles,
	childrenStyles,
	modalbackDropStyles,
	rootPortalStyles,
	hasOverflow: modalOverflow,
	modalHeaderStyles,
	'data-testid': testId,
}) {
	const hasOverflow = modalOverflow || showBackAct;

	useEffect(() => {
		if (window && window.document && id) {
			const elem = document.getElementById(id);
			if (elem && show) {
				elem.setAttribute(
					'style',
					`
						position: absolute;
						top: 0;
						left: 0;
						height: 100vh;
						width: 100%;
						display: flex;
						justify-content: center;
						align-items: center;
						${rootPortalStyles || ''}
					`,
				);
			}
		}
		return () => {
			if (id && show) {
				const elem = document.getElementById(id);
				if (elem) {
					elem.setAttribute('style', '');
				}
			}
		};
	}, [id, show]);

	const handleMove = e => {
		if (show && (hasOverflow || size === 'full')) {
			e.preventDefault();
		}
	};
	useEffect(() => {
		const body = document.querySelector('body');
		const hasNoOverflow = body.classList.contains('noOverflow');
		document.addEventListener('touchmove', handleMove, false);

		if (show && (hasOverflow || size === 'full') && !hasNoOverflow) {
			body.classList.add('noOverflow');
		} else {
			body.classList.remove('noOverflow');
		}
		return () => {
			document.removeEventListener('touchmove', handleMove);
			body.classList.remove('noOverflow');
		};
	}, [show, size, showBackAct]);

	return ReactDOM.createPortal(
		show ? (
			<ModalMainContainer styles={modalContainerStyles}>
				<ModalBackdrop
					onClick={handleClickOutside && closeModal}
					styles={modalbackDropStyles}
				/>
				<ModalBody
					size={size}
					styles={bodyStyles}
					data-testid={`${testId ? `${testId}_` : ''}modal_body`}
				>
					{showCloseAct && closeModal && (
						<CloseContainer
							onClick={() => {
								closeModal();
							}}
						>
							<CloseSvg
								styles={`${closeBtnType !== 'unstyled' ? defaultCloseBtn : ''} ${
									closePlacement === 'inside' ? closeActInside : closeModalAct
								}`}
								data-testid="close_button"
							/>
						</CloseContainer>
					)}
					{showBackAct && closeModal && (
						<ModalHeader styles={modalHeaderStyles}>
							{/* <BackBtn clickHandler={closeModal} styles={defaultBackBtn} /> */}
							{headerComponent &&
								(typeof headerComponent === 'string' ? (
									<ModalHeaderTitle>{headerComponent}</ModalHeaderTitle>
								) : (
									<ModalHeaderComponent>{headerComponent}</ModalHeaderComponent>
								))}
						</ModalHeader>
					)}
					<ModalChildren
						header={showBackAct && closeModal}
						childrenStyles={childrenStyles}
					>
						{children}
					</ModalChildren>
				</ModalBody>
			</ModalMainContainer>
		) : null,
		document.getElementById(id),
	);
}

Modal.useSetupHook = useSetupHook;

export default Modal;
