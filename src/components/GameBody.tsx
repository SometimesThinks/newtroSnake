import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { getRandomColor } from '../utils/color';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 35;
const CELL_SIZE = SCREEN_WIDTH / BOARD_WIDTH;

// 맵 데이터 타입 정의
interface MapData {
  round: number;
  apple_count: number;
  map: number[][];
}

// 맵 데이터 import
const mapData = require('../assets/newtro_snake_32_rounds_difficult_apples.json');

const generateRandomApple = (currentMap: number[][]): [number, number] => {
  const availablePositions: [number, number][] = [];

  for (let y = 0; y < currentMap.length; y++) {
    for (let x = 0; x < currentMap[y].length; x++) {
      if (currentMap[y][x] === 2) {
        // 사과 위치
        availablePositions.push([x, y]);
      }
    }
  }

  if (availablePositions.length === 0) {
    // 사과 위치가 없으면 빈 공간에서 랜덤 생성
    for (let y = 0; y < currentMap.length; y++) {
      for (let x = 0; x < currentMap[y].length; x++) {
        if (currentMap[y][x] === 0) {
          // 빈 공간
          availablePositions.push([x, y]);
        }
      }
    }
  }

  const randomIndex = Math.floor(Math.random() * availablePositions.length);
  return availablePositions[randomIndex];
};

interface GameBodyProps {
  round: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  onNextRound: () => void;
  onGameOver: () => void;
  snakeColor: string;
  appleColor: string;
  onEatColoredApple: (color: string) => void;
  onChangeAppleColor: () => void;
  onScoreUpdate: () => void;
  isPaused?: boolean; // 게임 일시정지 상태 추가
}

const GameBody = ({
  round,
  onNextRound,
  onGameOver,
  direction,
  snakeColor,
  appleColor,
  onEatColoredApple,
  onChangeAppleColor,
  onScoreUpdate,
  isPaused = false, // 기본값 false
}: GameBodyProps) => {
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  const [apple, setApple] = useState<[number, number]>([5, 5]);
  const [appleEaten, setAppleEaten] = useState<boolean>(false);
  const [gameOverFlag, setGameOverFlag] = useState<boolean>(false);
  const [currentMap, setCurrentMap] = useState<number[][]>([]);

  // 현재 라운드의 맵 데이터 가져오기
  useEffect(() => {
    const roundData = mapData.rounds.find((r: MapData) => r.round === round);
    if (roundData) {
      setCurrentMap(roundData.map);
      // 초기 사과 위치 설정
      const initialApple = generateRandomApple(roundData.map);
      setApple(initialApple);
    }
  }, [round]);

  const checkCollision = (head: [number, number]) => {
    const [headX, headY] = head;

    // 벽과 충돌 체크 (맵 데이터의 1값)
    if (
      headY >= 0 &&
      headY < currentMap.length &&
      headX >= 0 &&
      headX < currentMap[headY].length
    ) {
      if (currentMap[headY][headX] === 1) {
        setGameOverFlag(true);
        return true;
      }
    }

    // 화면 경계 체크
    if (
      headX < 0 ||
      headX >= BOARD_WIDTH ||
      headY < 0 ||
      headY >= BOARD_HEIGHT
    ) {
      setGameOverFlag(true);
      return true;
    }

    // 몸통과 충돌 체크
    for (let i = 1; i < snake.length; i++) {
      if (headX === snake[i][0] && headY === snake[i][1]) {
        setGameOverFlag(true);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // 게임이 일시정지 상태면 interval을 실행하지 않음
    if (isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const [headX, headY] = prevSnake[0];
        let newHead: [number, number] = [headX, headY];

        // 방향에 따라 머리 위치 업데이트
        switch (direction) {
          case 'UP':
            newHead = [headX, headY - 1];
            break;
          case 'DOWN':
            newHead = [headX, headY + 1];
            break;
          case 'LEFT':
            newHead = [headX - 1, headY];
            break;
          case 'RIGHT':
            newHead = [headX + 1, headY];
            break;
        }

        if (checkCollision(newHead)) {
          clearInterval(interval);
          return prevSnake;
        }

        // 사과를 먹었는지 체크
        const ateApple = newHead[0] === apple[0] && newHead[1] === apple[1];

        if (ateApple) {
          setAppleEaten(true);
          return [newHead, ...prevSnake]; // 몸 길이 증가
        } else {
          return [newHead, ...prevSnake.slice(0, -1)];
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [direction, apple, currentMap, isPaused]);

  useEffect(() => {
    // 게임이 일시정지 상태면 사과 재생성을 하지 않음
    if (isPaused) {
      return;
    }

    if (appleEaten) {
      const newApple = generateRandomApple(currentMap);
      setApple(newApple);
      onChangeAppleColor();
      onEatColoredApple(appleColor);
      onScoreUpdate();
      setAppleEaten(false);
    }
  }, [appleEaten, currentMap, isPaused]);

  useEffect(() => {
    if (gameOverFlag) {
      onGameOver();
    }
  }, [gameOverFlag]);

  return (
    <Board>
      {Array.from({ length: BOARD_HEIGHT }).map((_, rowIndex) => (
        <Row key={rowIndex}>
          {Array.from({ length: BOARD_WIDTH }).map((_, colIndex) => {
            const isSnake = snake.some(
              ([x, y]) => x === colIndex && y === rowIndex,
            );
            const isApple = apple[0] === colIndex && apple[1] === rowIndex;
            const isWall =
              currentMap[rowIndex] && currentMap[rowIndex][colIndex] === 1;

            return (
              <Cell
                key={colIndex}
                $isSnake={isSnake}
                $isApple={isApple}
                $isWall={isWall}
                snakeColor={snakeColor}
                appleColor={appleColor}
              />
            );
          })}
        </Row>
      ))}
    </Board>
  );
};

const Board = styled.View`
  flex: 1;
  background-color: ${({ theme }: { theme: any }) => theme.colors.surface};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.View<{
  $isSnake: boolean;
  $isApple?: boolean;
  $isWall?: boolean;
  snakeColor: string;
  appleColor: string;
}>`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${({
    $isApple,
    $isSnake,
    $isWall,
    snakeColor,
    appleColor,
    theme,
  }: {
    $isApple?: boolean;
    $isSnake: boolean;
    $isWall?: boolean;
    snakeColor: string;
    appleColor: string;
    theme: any;
  }) => {
    if ($isWall) return theme.colors.error;
    if ($isApple) return appleColor;
    if ($isSnake) return snakeColor;
    return theme.colors.background;
  }};
  border-radius: 2px;
`;

export default GameBody;
