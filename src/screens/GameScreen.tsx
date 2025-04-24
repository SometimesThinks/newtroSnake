import React from 'react';
import styled from 'styled-components/native';
import GameHeader from '../components/GameHeader';
import GameBody from '../components/GameBody';

const GameScreen = () => {
  return (
    <Container>
      <GameHeader />
      <GameBody />
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
