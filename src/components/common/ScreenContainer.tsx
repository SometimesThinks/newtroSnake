import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import styled from 'styled-components';

interface ScreenContainerProps {
  children: React.ReactNode;
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return <Container>{children}</Container>;
};

const Container = styled(SafeAreaView)`
  flex: 1;
`;

export default ScreenContainer;
