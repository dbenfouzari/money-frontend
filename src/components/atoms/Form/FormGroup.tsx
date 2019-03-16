import * as React from 'react';
import styled from 'styled-components';

import { StyledLabel } from './Label';
import { StyledInput } from './Input';
import { StyledSelectWrapper } from './Select';

interface FormGroupProps {
  children: JSX.Element | JSX.Element[];
}

const StyledFormGroup = styled.div`
  display: flex;
  align-items: center;

  ${/* sc-selector */ StyledLabel} {
    width: 300px;
    flex: 1;
  }
  
  ${/* sc-selector */ StyledInput}, ${
  /* sc-selector */ StyledSelectWrapper
}, .form-control {
    flex: 4;
  }

  ${/* sc-selector */ StyledLabel} + ${/* sc-selector */ StyledInput},
  ${/* sc-selector */ StyledLabel} + ${/* sc-selector */ StyledSelectWrapper},
  ${/* sc-selector */ StyledLabel} + .form-control {
    margin-left: 10px;
  }
  
  & + & {
    margin-top: 10px;
  }
`;

const FormGroup = ({ children }: FormGroupProps) => (
  <StyledFormGroup>{children}</StyledFormGroup>
);

export default FormGroup;
