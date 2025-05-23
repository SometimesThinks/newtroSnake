import React, { useEffect, useState } from 'react';

import styled from 'styled-components/native';

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 40;
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
}

const GameBody = ({
  round,
  onNextRound,
  onGameOver,
  direction,
}: GameBodyProps) => {
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  const [apple, setApple] = useState<[number, number][]>([
    generateRandomApple(),
  ]);
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
        const ateApple = apple.some(
          ([x, y]) => x === newHead[0] && y === newHead[1],
        );
        if (ateApple) {
          setApple((prev) =>
            prev.filter(([x, y]) => !(x === newHead[0] && y === newHead[1])),
          );
          return [newHead, ...prevSnake];
        } else {
          return [newHead, ...prevSnake.slice(0, -1)];
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [direction, apple]);

  useEffect(() => {
    if (apple.length === 0) {
      onNextRound();
    }
  }, [apple]);

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
            const isApple = apple.some(
              ([x, y]) => x === colIndex && y === rowIndex,
            );

            return (
              <Cell key={colIndex} $isSnake={isSnake} $isApple={isApple} />
            );
          })}
        </Row>
      ))}
    </Board>
  );
};

const Board = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.View<{ $isSnake: boolean; $isApple?: boolean }>`
  width: 12px;
  height: 12px;
  margin: 1px;
  background-color: ${({ $isSnake, $isApple }) =>
    $isApple ? 'red' : $isSnake ? '#333' : '#fff'};
  border-radius: 2px;
`;

export default GameBody;
