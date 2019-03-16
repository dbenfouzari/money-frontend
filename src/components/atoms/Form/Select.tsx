import * as React from 'react';
import styled from 'styled-components';

export interface SelectOption<T> {
  label: string | number;
  value: T;
}

export interface SelectProps<T extends string | number> {
  value: T;
  options: SelectOption<T>[];
  onChange: (nextValue: T) => void;
}

export const StyledSelectWrapper = styled.div`
  position: relative;
`;

const StyledSelect = styled.div`
  border: 1px solid #a7d0e2;
  background-color: rgba(188, 234, 254, 0.76);
  border-radius: 4px;
  padding: 10px;

  &:focus,
  &:active {
    outline: none;
  }
`;

const StyledOptions = styled.div`
  background-color: #fff;
  border: 1px solid #a7d0e2;
  position: absolute;
  top: -1px;
  width: 100%;
  z-index: 1;
`;

const StyledOption = styled.div`
  padding: 10px;
  cursor: default;

  &:hover {
    background-color: #eee;
  }
`;

const Select = <T extends string | number>({
  value,
  options,
  onChange,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
  //   // TODO: Find a better way than `any` ?
  //   onChange(event.target.value as any);
  // };

  const handleChange = (nextValue: T) => (): void => {
    onChange(nextValue);
    setIsOpen(false);
  };

  const shownValue = options.find(option => option.value === value);

  return (
    <StyledSelectWrapper>
      <StyledSelect onClick={() => setIsOpen(!isOpen)}>
        {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
        {shownValue!.label}
      </StyledSelect>
      {isOpen ? (
        <StyledOptions>
          {options.map(option => (
            <StyledOption
              key={option.value}
              onClick={handleChange(option.value)}
            >
              {option.label}
            </StyledOption>
          ))}
        </StyledOptions>
      ) : null}
    </StyledSelectWrapper>
  );
};

export default Select;
