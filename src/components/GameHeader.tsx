import React from 'react';

import styled from 'styled-components/native';

interface GameHeaderProps {
  round: number;
  score: number;
}

const GameHeader = ({ round, score }: GameHeaderProps) => {
  return (
    <Container>
      <HeaderText>Round: {round}</HeaderText>
      <HeaderText>Score: {score}</HeaderText>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const HeaderText = styled.Text`
  font-size: 12px;
`;

export default GameHeader;
