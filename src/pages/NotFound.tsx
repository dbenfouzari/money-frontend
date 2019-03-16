import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

const FullPageWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NotFound = (): JSX.Element => (
  <FullPageWrapper>
    <h1>
      <Trans>404 - Not Found</Trans>
    </h1>
    <h2>
      <Trans>
        <Link to='/'>Come back to home page</Link>
      </Trans>
    </h2>
  </FullPageWrapper>
);

export default NotFound;
