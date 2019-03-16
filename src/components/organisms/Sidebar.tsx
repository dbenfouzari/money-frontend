import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledSidebar = styled.nav`
  grid-area: sidebar;
  background-color: #333;
  color: #e9e9e9;

  a,
  a:visited {
    color: #e9e9e9;
  }
`;

const Sidebar = (): JSX.Element => (
  <StyledSidebar>
    <ul>
      <li>
        <Link to='/'>Calendar</Link>
      </li>
      <li>
        <Link to='/charts'>Charts</Link>
      </li>
    </ul>
  </StyledSidebar>
);

export default Sidebar;
