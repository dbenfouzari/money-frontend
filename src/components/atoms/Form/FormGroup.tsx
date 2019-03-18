import * as React from 'react';
import styled from 'styled-components';

import { StyledLabel } from './Label';
import { StyledInput } from './Input';
import { StyledSelectWrapper } from './Select';

interface FormGroupProps {
  children:
    | string
    | JSX.Element
    | JSX.Element[]
    | (string | JSX.Element | JSX.Element[])[];
}

const StyledFormGroup = styled.label`
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

const FormGroup = ({ children }: FormGroupProps): JSX.Element => (
  <StyledFormGroup>
    {React.Children.map(children, child => {
      if (typeof child === 'string') {
        return <StyledLabel as='span'>{child}</StyledLabel>;
      }
      return child;
    })}
  </StyledFormGroup>
);

export default FormGroup;
