import React from 'react';

import styled from 'styled-components/native';

interface GameHeaderProps {
  round: number;
}

const GameHeader = ({ round }: GameHeaderProps) => {
  return (
    <Container>
      <HeaderText>Round: {round}</HeaderText>
      <HeaderText>Score: 0</HeaderText>
      <HeaderText>Time: 00:00</HeaderText>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const HeaderText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

export default GameHeader;
