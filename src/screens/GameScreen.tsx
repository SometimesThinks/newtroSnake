import React, { useState } from 'react';

import styled from 'styled-components/native';

import GameLayout from '../../layouts/GameLayout';
import GameBody from '../components/GameBody';
import GameHeader from '../components/GameHeader';
import GameInput from '../components/GameInput';
import GameOverModal from '../components/GameOverModal';
import RoundClearModal from '../components/RoundClearModal';

const GameScreen = () => {
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isRoundClear, setIsRoundClear] = useState<boolean>(false);
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
  // 라운드 클리어 함수
  const handleRoundClear = () => {
    setIsRoundClear(true);
    setTimeout(() => {
      setIsRoundClear(false);
      setRound((prev) => prev + 1);
      setResetKey((prev) => prev + 1);
    }, 3000);
  };

  return (
    <GameLayout>
      <Container>
        <GameHeader round={round} score={score} />
        <GameBody
          key={resetKey}
          round={round}
          direction={direction}
          onNextRound={handleRoundClear}
          onGameOver={() => setIsGameOver(true)}
        />
        <GameInput onSwipe={handleDirection} />
        <RoundClearModal isOpen={isRoundClear} />
        {/* <GameOverModal isOpen={isGameOver} onRetry={retryGame} /> */}
      </Container>
    </GameLayout>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default GameScreen;
