import * as React from 'react';
import styled from 'styled-components';

export interface LabelProps {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | (string | JSX.Element | JSX.Element[])[];
}

export const StyledLabel = styled.label`
  color: inherit;
`;

const Label = ({ children, ...props }: LabelProps): JSX.Element => (
  <StyledLabel {...props}>{children}</StyledLabel>
);

export default Label;
