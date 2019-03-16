import React from 'react';
import styled from 'styled-components';

import Topbar from './Topbar';
import Content from './Content';

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

const LayoutWrapper = styled.div`
  display: grid;
  grid-template-areas:
    'topbar'
    'content';
  grid-template-rows: 120px 1fr;
  height: 100vh;
  max-height: 100vh;
`;

const Layout = ({ children }: LayoutProps): JSX.Element => (
  <LayoutWrapper>
    <Topbar />
    <Content>{children}</Content>
  </LayoutWrapper>
);

export default Layout;
