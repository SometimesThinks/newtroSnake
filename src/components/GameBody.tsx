import React, { useState } from 'react';
import styled from 'styled-components/native';

const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 30;

const GameBody = () => {
  const [snake, setSnake] = useState([
    [5, 5],
    [4, 5],
    [3, 5],
  ]);

  return (
    <Board>
      {Array.from({ length: BOARD_HEIGHT }).map((_, row) => (
        <Row key={`row-${row}`}>
          {Array.from({ length: BOARD_WIDTH }).map((_, col) => {
            const isSnake = snake.some(([x, y]) => x === col && y === row);
            return <Cell key={`cell-${row}-${col}`} isSnake={isSnake} />;
          })}
        </Row>
      ))}
    </Board>
  );
};

const Board = styled.View`
  background-color: #eaeaea;
  padding: 4px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Cell = styled.View<{ isSnake: boolean }>`
  width: 12px;
  height: 12px;
  margin: 1px;
  background-color: ${({ isSnake }) => (isSnake ? '#333' : '#fff')};
  border-radius: 2px;
`;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  margin: 10px;
  shadow-color: #000;
`;

const Text = styled.Text`
  font-size: 24px;
  color: #000;
`;

export default GameBody;
