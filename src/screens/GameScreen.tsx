import React from 'react';
import { useState } from 'react';
import styled from 'styled-components/native';
import GameHeader from '../components/GameHeader';
import GameInput from '../components/GameInput';
import GameBody from '../components/GameBody';

const GameScreen = () => {
  const [direction, setDirection] = React.useState<
    'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  >('RIGHT');

  return (
    <Container>
      <GameHeader />
      <GameBody direction={direction} />
      <GameInput onSwipe={(dir) => setDirection(dir)} />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24px;
  color: #000;
`;

export default GameScreen;
