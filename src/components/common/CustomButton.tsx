import React from 'react';

import styled from 'styled-components/native';

interface CustomBtnProps {
  title: string;
  onPress: () => void;
}

const CustomButton = ({ title, onPress }: CustomBtnProps) => {
  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.Pressable`
  width: 80%;
  height: 50px;
  background-color: #007bff;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  line-height: 50px;
`;

export default CustomButton;
