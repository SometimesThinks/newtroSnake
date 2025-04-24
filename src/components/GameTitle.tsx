import React from 'react';
import styled from 'styled-components/native';

const GameTitle = () => {
  return (
    <Container>
      <Title>NEWTRO SNAKE</Title>
    </Container>
  );
};

const Container = styled.View`
  border: 1px solid black;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #000;
  text-align: center;
`;

export default GameTitle;
