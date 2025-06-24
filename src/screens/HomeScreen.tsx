import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import HomeLayout from '../../layouts/HomeLayout';
import GameTitle from '../components/GameTitle';
import CustomButton from '../components/common/CustomButton';
import { RootStackParamList } from '../types/navigation';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <HomeLayout>
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
    </HomeLayout>
  );
};

const ButtonBox = styled.View`
  flex: 5;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

export default HomeScreen;
