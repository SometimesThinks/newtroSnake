import React from 'react';

import styled from 'styled-components/native';

import CustomText from './common/CustomText';

interface GameHeaderProps {
  round: number;
  score: number;
}

const GameHeader = ({ round, score }: GameHeaderProps) => {
  return (
    <Container>
      <Row>
        <LabelBox>
          <LabelText>ROUND</LabelText>
        </LabelBox>
        <LabelBox>
          <LabelText>SCORE</LabelText>
        </LabelBox>
      </Row>
      <Row>
        <LabelBox>
          <ScoreText>{round}</ScoreText>
        </LabelBox>
        <LabelBox>
          <ScoreText>{score}</ScoreText>
        </LabelBox>
      </Row>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
`;

const Row = styled.View`
  flex-direction: row;
`;

const LabelBox = styled.View`
  flex: 1;
  align-items: center;
`;

const LabelText = styled(CustomText)`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScoreText = styled(CustomText)`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.text};
`;

export default GameHeader;
