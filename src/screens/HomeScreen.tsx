import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import GameTitle from '../components/GameTitle';
import CustomButton from '../components/common/CustomButton';
import ScreenContainer from '../components/common/ScreenContainer';
import { RootStackParamList } from '../types/navigation';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <ScreenContainer>
      <GameTitle />
      <ButtonBox>
        <CustomButton
          title='START'
          onPress={() => navigation.navigate('Game')}
        />
        <CustomButton
          title='SETTING'
          onPress={() => navigation.navigate('Setting')}
        />
      </ButtonBox>
    </ScreenContainer>
  );
};

const ButtonBox = styled.View`
  flex: 2;
  border: 1px solid black;
  justify-content: start;
  align-items: center;
`;

export default HomeScreen;
