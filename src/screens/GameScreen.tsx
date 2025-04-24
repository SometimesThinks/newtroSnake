import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import GameHeader from '../components/GameHeader';

const GameScreen = () => {
  return (
    <Container>
      <GameHeader />
      <Text>Game Screen</Text>
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
