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
  background-color: #112244;
  border: 2px solid #00cfff;
  border-radius: 10px;
`;

const Title = styled(CustomText)`
  text-align: center;
  font-size: 48px;
  color: ${({ theme }) => theme.colors.text};
`;

export default CustomButton;
