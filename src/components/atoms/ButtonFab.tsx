import * as React from 'react';
import styled from 'styled-components';

interface ButtonFab {
  onClick?: () => void;
  children: JSX.Element | string;
  ariaLabel?: string;
}

const StyledBtnFab = styled.button`
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  bottom: 20px;
  color: rgba(16, 119, 24, 1);
  display: flex;
  font-size: 32px;
  height: 70px;
  justify-content: center;
  opacity: 0.7;
  position: fixed;
  right: 20px;
  transition: opacity 0.3s ease;
  width: 70px;
  z-index: 999;

  &:active {
    border-style: none;
  }

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
  }
`;

const ButtonFab = ({
  onClick,
  children,
  ariaLabel,
}: ButtonFab): JSX.Element => (
  <StyledBtnFab aria-label={ariaLabel} onClick={onClick}>
    {children}
  </StyledBtnFab>
);

export default ButtonFab;
