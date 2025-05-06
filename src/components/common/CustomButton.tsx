import React from 'react';

import styled from 'styled-components/native';

import CustomText from './CustomText';

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
  background-color: #fefefe;
  border-radius: 10px;
`;

const Title = styled(CustomText)`
  font-size: 40px;
  text-align: center;
  color: #2d2d2d;
`;

export default CustomButton;
