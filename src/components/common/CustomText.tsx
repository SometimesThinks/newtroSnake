import React from 'react';
import { TextProps } from 'react-native';

import styled from 'styled-components/native';

interface CustomTextProps extends TextProps {
  children: React.ReactNode;
}

const CustomText = ({ children, style, ...rest }: CustomTextProps) => {
  return (
    <StyledText style={style} {...rest}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.Text`
  font-family: 'ZenTokyoZoo-Regular';
  text-align: center;
  text-shadow: 0px 0px 8px #00f0ff;
`;

export default CustomText;
