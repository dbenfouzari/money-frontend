import * as React from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: JSX.Element | JSX.Element[] | string;
}

const StyledLayout = styled.div`
  background-color: #ddd;
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 90px 1fr;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    'header header'
    'sidebar content';
`;

const DefaultLayout = ({ children }: LayoutProps): JSX.Element => (
  <StyledLayout>{children}</StyledLayout>
);

export default DefaultLayout;
