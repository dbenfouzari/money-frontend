import * as React from 'react';
import styled from 'styled-components';

interface ContentProps {
  children: JSX.Element | JSX.Element[] | string;
}

const StyledContent = styled.main`
  grid-area: content;
  overflow-y: auto;
`;

const Content = ({ children }: ContentProps): JSX.Element => (
  <StyledContent>{children}</StyledContent>
);

export default Content;
