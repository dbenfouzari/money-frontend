import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TopbarWrapper = styled.header`
  box-shadow: 0 1px 2px 2px rgba(120, 120, 120, 0.3);
  grid-area: topbar;
  color: ${props => props.theme.primary};
`;

const Topbar = (): JSX.Element => (
  <TopbarWrapper>
    <h1>This is a page</h1>
    <Link to='/unknown-route'>404</Link>
  </TopbarWrapper>
);

export default Topbar;
