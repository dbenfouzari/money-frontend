import * as React from 'react';
import styled from 'styled-components';

export interface LabelProps {
  children: string;
}

export const StyledLabel = styled.label`
  color: inherit;
`;

const Label = ({ children }: LabelProps) => (
  <StyledLabel>{children}</StyledLabel>
);

export default Label;
