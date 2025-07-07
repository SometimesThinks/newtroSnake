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
      <ScoreRow>
        <LabelBox>
          <ScoreText>{round}</ScoreText>
        </LabelBox>
        <LabelBox>
          <ScoreText>{score}</ScoreText>
        </LabelBox>
      </ScoreRow>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  height: 12%;
`;

const Row = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ScoreRow = styled.View`
  flex: 2;
  flex-direction: row;
`;

const LabelBox = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LabelText = styled(CustomText)`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScoreText = styled(CustomText)`
  font-size: 48px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  include-font-padding: false;
  text-align-vertical: center;
`;

export default GameHeader;
