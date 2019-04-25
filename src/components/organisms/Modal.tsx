import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';
import posed, { PoseGroup } from 'react-pose';

interface ModalProps {
  children: JSX.Element | JSX.Element[] | string;
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
}

const BackdropAnimation = posed.div({
  enter: { opacity: 0.5 },
  exit: { opacity: 0 },
});

const ModalAnimation = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 },
    },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
  },
});

const Backdrop = styled(BackdropAnimation)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: #000;
`;

const AnimatedModalWrapper = posed.div({});

const ModalWrapper = styled(AnimatedModalWrapper)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1010;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled(ModalAnimation)`
  max-width: 700px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.3);
`;

const Modal = ({
  children,
  isOpen,
  onClose,
  closeOnBackdropClick,
}: ModalProps): JSX.Element | null => {
  const onBackdropClick = (): void => {
    if (closeOnBackdropClick) onClose();
    return;
  };

  const listenEscapeKey = React.useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose],
  );

  React.useEffect((): (() => void) => {
    document.addEventListener('keydown', listenEscapeKey);

    return function cleanup(): void {
      document.removeEventListener('keydown', listenEscapeKey);
    };
  }, [isOpen, listenEscapeKey]);

  return ReactDOM.createPortal(
    <PoseGroup>
      {isOpen
        ? [
            <Backdrop key='modal-backdrop' />,
            <ModalWrapper
              key='modal-wrapper'
              data-testid='modal__background'
              onClick={onBackdropClick}
            >
              <StyledModal
                key='modal'
                data-testid='modal__modal'
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                {children}
              </StyledModal>
            </ModalWrapper>,
          ]
        : undefined}
    </PoseGroup>,
    document.body,
  );
};

export default Modal;
