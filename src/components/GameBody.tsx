import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import { getRandomColor } from '../utils/color';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 35;
const CELL_SIZE = SCREEN_WIDTH / BOARD_WIDTH;

const generateRandomApple = (): [number, number] => {
  return [
    Math.floor(Math.random() * BOARD_WIDTH),
    Math.floor(Math.random() * BOARD_HEIGHT),
  ];
};

interface GameBodyProps {
  round: number;
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  onNextRound: () => void;
  onGameOver: () => void;
  snakeColor: string; // ✅ snakeColor prop 추가
  appleColor: string; // ✅ appleColor prop 추가
  onEatColoredApple: (color: string) => void; // ✅ 사과 색 전달 시 뱀 색 변경 함수
  onChangeAppleColor: () => void; // ✅ 사과 색 변경 함수
}

const GameBody = ({
  round,
  onNextRound,
  onGameOver,
  direction,
  snakeColor, // ✅ snakeColor prop 추가
  appleColor, // ✅ appleColor prop 추가
  onEatColoredApple, // ✅ 사과 색 전달 시 뱀 색 변경 함수
  onChangeAppleColor, // ✅ 사과 색 변경 함수
}: GameBodyProps) => {
  const { starColors } = useTheme(); // ✅ 테마에서 색상 가져오기

  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  const [apple, setApple] = useState<[number, number]>(generateRandomApple()); // ✅ 단일 사과로 변경
  const [appleEaten, setAppleEaten] = useState<boolean>(false); // ✅ setState 렌더 중 호출 방지용
  const [gameOverFlag, setGameOverFlag] = useState<boolean>(false);

  const checkCollision = (head: [number, number]) => {
    const [headX, headY] = head;
    // 벽과 충돌 체크
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
          setAppleEaten(true); // ✅ 렌더 후 실행되도록 상태만 변경
          return [newHead, ...prevSnake]; // ✅ 몸 길이 증가
        } else {
          return [newHead, ...prevSnake.slice(0, -1)];
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [direction, apple]);

  useEffect(() => {
    if (appleEaten) {
      setApple(generateRandomApple());
      onChangeAppleColor();
      onEatColoredApple(appleColor);
      setAppleEaten(false);
    }
  }, [appleEaten]);

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
            return (
              <Cell
                key={colIndex}
                $isSnake={isSnake}
                $isApple={isApple}
                snakeColor={snakeColor} // ✅ 뱀 색상 반영
                appleColor={appleColor}
              /> // ✅ 사과 색상 반영/>
            );
          })}
        </Row>
      ))}
    </Board>
  );
};

const Board = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.View<{
  $isSnake: boolean;
  $isApple?: boolean;
  snakeColor: string;
  appleColor: string;
}>`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  background-color: ${({
    $isApple,
    $isSnake,
    snakeColor,
    appleColor,
    theme,
  }) =>
    $isApple ? appleColor : $isSnake ? snakeColor : theme.colors.background};
  border-radius: 2px;
`;

export default GameBody;
