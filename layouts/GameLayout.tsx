import React from 'react';

import styled from 'styled-components/native';

import ScreenContainer from '../src/components/common/ScreenContainer';
import { StarDot } from '../styles/layout';

interface GameLayoutProps {
  children: React.ReactNode;
}

const GameLayout = ({ children }: GameLayoutProps) => {
  return (
    <ScreenContainer>
      <NightBackground>{children}</NightBackground>
    </ScreenContainer>
  );
};

const NightBackground = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.surface};
`;

export default GameLayout;
