import React, { useState } from 'react';

import styled from 'styled-components/native';

import FailModal from '../components/FailModal';
import GameBody from '../components/GameBody';
import GameHeader from '../components/GameHeader';
import GameInput from '../components/GameInput';

const GameScreen = () => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [direction, setDirection] = React.useState<
    'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  >('RIGHT');
  const [resetKey, setResetKey] = useState<number>(0);

  // 방향 전환 함수
  const handleDirection = (newDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => {
    if (
      (direction === 'UP' && newDir !== 'DOWN') ||
      (direction === 'DOWN' && newDir !== 'UP') ||
      (direction === 'LEFT' && newDir !== 'RIGHT') ||
      (direction === 'RIGHT' && newDir !== 'LEFT')
    ) {
      setDirection(newDir);
    }
  };

  // 게임 재시작 함수
  const retryGame = () => {
    setIsGameOver(false);
    setDirection('RIGHT');
    setResetKey((prev) => prev + 1);
  };

  return (
    <Container>
      <GameHeader />
      <GameBody
        key={resetKey}
        onGameOver={() => setIsGameOver(true)}
        direction={direction}
      />
      <GameInput onSwipe={handleDirection} />
      <FailModal onRetry={retryGame} isOpen={isGameOver} />
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
