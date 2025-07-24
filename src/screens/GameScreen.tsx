import React, { useState } from 'react';

import styled, { useTheme } from 'styled-components/native';

import GameLayout from '../../layouts/GameLayout';
import GameBody from '../components/GameBody';
import GameHeader from '../components/GameHeader';
import GameInput from '../components/GameInput';
import GameOverModal from '../components/GameOverModal';
import RoundClearModal from '../components/RoundClearModal';
import { getRandomColor } from '../utils/color';

// 맵 데이터 import
const mapData = require('../assets/newtro_snake_32_rounds_difficult_apples.json');

const GameScreen = () => {
  const { starColors } = useTheme();
  // 게임 상태 관리
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [round, setRound] = useState<number>(1); // 1부터 시작
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
  const [applesEaten, setApplesEaten] = useState<number>(0); // 현재 라운드에서 먹은 사과 수

  // 현재 라운드의 사과 개수 가져오기
  const getCurrentRoundAppleCount = () => {
    const roundData = mapData.rounds.find((r: any) => r.round === round);
    return roundData ? roundData.apple_count : 1;
  };

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

  // 스코어 업데이트 함수
  const handleScoreUpdate = () => {
    setScore((prev) => prev + 1);
    setApplesEaten((prev) => prev + 1);

    // 현재 라운드의 모든 사과를 먹었는지 확인
    const currentAppleCount = getCurrentRoundAppleCount();
    if (applesEaten + 1 >= currentAppleCount) {
      handleRoundClear();
    }
  };

  // 게임 재시작 함수
  const retryGame = () => {
    setIsGameOver(false);
    setScore(0);
    setRound(1);
    setDirection('RIGHT');
    setResetKey((prev) => prev + 1);
    setSnakeColor(getRandomColor(starColors));
    setAppleColor(getRandomColor(starColors));
    setApplesEaten(0);
  };

  // 라운드 클리어 함수
  const handleRoundClear = () => {
    setIsRoundClear(true);
    setTimeout(() => {
      setIsRoundClear(false);
      if (round < 32) {
        setRound((prev) => prev + 1);
        setApplesEaten(0);
      } else {
        // 32라운드 완료 - 게임 클리어
        setIsGameOver(true);
      }
      setResetKey((prev) => prev + 1);
    }, 3000);
    setSnakeColor(getRandomColor(starColors));
    setAppleColor(getRandomColor(starColors));
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
          onScoreUpdate={handleScoreUpdate}
          isPaused={isRoundClear || isGameOver} // 라운드 클리어 또는 게임 오버 시 일시정지
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
