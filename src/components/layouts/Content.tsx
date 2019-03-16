import React from 'react';
import styled from 'styled-components';

interface ContentProps {
  children: JSX.Element | JSX.Element[];
}

const ContentWrapper = styled.main`
  grid-area: content;
  max-height: 100vh;
  overflow: hidden;
`;

const Content = ({ children }: ContentProps): JSX.Element => (
  <ContentWrapper>{children}</ContentWrapper>
);

export default Content;
