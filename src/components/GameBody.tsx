import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components/native';

const BOARD_WIDTH = 30;
const BOARD_HEIGHT = 50;

interface GameBodyProps {
  direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
}

const GameBody = ({ direction }: GameBodyProps) => {
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  // const [apple, setApple] = useState<[number, number]>(generateRandomApple());
  const [apple, setApple] = useState<[number, number]>([8, 5]);

  function generateRandomApple(): [number, number] {
    return [
      Math.floor(Math.random() * BOARD_WIDTH),
      Math.floor(Math.random() * BOARD_HEIGHT),
    ];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const [headX, headY] = prevSnake[0];
        let newHead: [number, number] = [headX, headY];

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

        const ateApple = newHead[0] === apple[0] && newHead[1] === apple[1];

        if (ateApple) {
          setApple(generateRandomApple()); // 새로운 사과 생성
          return [newHead, ...prevSnake]; // 사과 먹었으면 꼬리 자르지 않음
        } else {
          return [newHead, ...prevSnake.slice(0, -1)]; // 일반 이동 (꼬리 자름)
        }
      });
    }, 400);

    return () => clearInterval(interval);
  }, [direction, apple]);

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
