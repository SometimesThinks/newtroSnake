import React, { useState } from 'react';

import styled, { useTheme } from 'styled-components/native';

import GameLayout from '../../layouts/GameLayout';
import GameBody from '../components/GameBody';
import GameHeader from '../components/GameHeader';
import GameInput from '../components/GameInput';
import GameOverModal from '../components/GameOverModal';
import RoundClearModal from '../components/RoundClearModal';
import { getRandomColor } from '../utils/color';

const GameScreen = () => {
  const { starColors } = useTheme();
  // 게임 상태 관리
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [round, setRound] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isRoundClear, setIsRoundClear] = useState<boolean>(false);
  const [direction, setDirection] = React.useState<
    'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
  >('RIGHT');
  const [resetKey, setResetKey] = useState<number>(0);
  const [snakeColor, setSnakeColor] = useState<string>(
    getRandomColor(starColors),
  );
  const [appleColor, setAppleColor] = useState<string>(
    getRandomColor(starColors),
  );
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
  // 스코어 업데이트 함수 추가
  const handleScoreUpdate = () => {
    setScore((prev) => prev + 1);
  };
  // 게임 재시작 함수 수정
  const retryGame = () => {
    setIsGameOver(false);
    setScore(0); // 스코어 리셋 추가
    setRound(0); // 라운드 리셋 추가
    setDirection('RIGHT');
    setResetKey((prev) => prev + 1);
    setSnakeColor(getRandomColor(starColors));
    setAppleColor(getRandomColor(starColors));
  };
  // 라운드 클리어 함수
  const handleRoundClear = () => {
    setIsRoundClear(true);
    setTimeout(() => {
      setIsRoundClear(false);
      setRound((prev) => prev + 1);
      setResetKey((prev) => prev + 1);
    }, 3000);
    setSnakeColor(getRandomColor(starColors)); // ✅ 라운드 클리어 시 뱀 색상 리셋
    setAppleColor(getRandomColor(starColors)); // ✅ 라운드 클리어 시 사과 색상 리셋
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
          snakeColor={snakeColor}
          appleColor={appleColor}
          onEatColoredApple={(color) => setSnakeColor(color)}
          onChangeAppleColor={() => setAppleColor(getRandomColor(starColors))}
          onScoreUpdate={handleScoreUpdate} // ✅ 스코어 업데이트 콜백 추가
        />
        <GameInput onSwipe={handleDirection} />
        <RoundClearModal isOpen={isRoundClear} />
        <GameOverModal isOpen={isGameOver} onRetry={retryGame} score={score} />
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
