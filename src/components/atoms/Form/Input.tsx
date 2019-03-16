import * as React from 'react';
import styled from 'styled-components';

export interface InputProps<T extends number | string | Date = string> {
  value: T | null;
  type?: T extends number ? 'number' : T extends Date ? 'date' : 'text';
  onChange: (nextValue: T) => void;
}

export const StyledInput = styled.input`
  border: 1px solid #a7d0e2;
  background-color: rgba(188, 234, 254, 0.76);
  border-radius: 4px;
  padding: 10px;

  &:focus,
  &:active {
    outline: none;
  }
`;

const Input = <T extends number | string | Date>({
  value,
  type,
  onChange,
}: InputProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value as any);
  };

  let formattedValue;

  switch (typeof value) {
    case 'number':
      formattedValue = value;
      break;
    case 'object':
      if (value === null) {
        formattedValue = '';
        break;
      }
      if (value instanceof Date) formattedValue = value.getTime();
      break;
    case 'string':
      formattedValue = value;
      break;
    default:
      formattedValue = '';
  }

  return (
    <StyledInput type={type} onChange={handleChange} value={formattedValue} />
  );
};

export default Input;
