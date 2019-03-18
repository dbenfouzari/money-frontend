import * as React from 'react';
import styled from 'styled-components';

const StyledTopbar = styled.header`
  grid-area: header;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(120, 120, 120, 0.2);
  z-index: 1;
`;

const Topbar = (): JSX.Element => (
  <StyledTopbar>
    <h1>La topbar</h1>
  </StyledTopbar>
);

export default Topbar;
