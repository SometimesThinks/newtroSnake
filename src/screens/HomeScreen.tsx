import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GameTitle from '../components/GameTitle';
import CustomBtn from '../components/common/CustomBtn';
import { RootStackParamList } from '../types/navigation';

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <Container>
      <GameTitle />
      <CustomBtn title='START' onPress={() => navigation.navigate('Game')} />
      <CustomBtn
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
