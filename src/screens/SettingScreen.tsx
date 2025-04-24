import React from 'react';
import styled from 'styled-components/native';

const SettingScreen = () => {
  return (
    <Container>
      <Text>Setting Screen</Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 24px;
  color: #000;
`;

export default SettingScreen;
