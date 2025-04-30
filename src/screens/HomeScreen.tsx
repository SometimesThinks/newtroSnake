import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GameTitle from '../components/GameTitle';
import CustomButton from '../components/common/CustomButton';
import { RootStackParamList } from '../types/navigation';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <Container>
      <GameTitle />
      <CustomButton title='START' onPress={() => navigation.navigate('Game')} />
      <CustomButton
        title='SETTING'
        onPress={() => navigation.navigate('Setting')}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default HomeScreen;
