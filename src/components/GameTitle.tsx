import React from 'react';

import styled from 'styled-components/native';

import CustomText from './common/CustomText';

const GameTitle = () => {
  return (
    <Container>
      <TitleText>NEWTRO</TitleText>
      <TitleText>SNAKE</TitleText>
    </Container>
  );
};

const Container = styled.View`
  flex: 4;
  justify-content: center;
`;

const TitleText = styled(CustomText)`
  font-size: 68px;
  color: #00cfff;
`;

export default GameTitle;
