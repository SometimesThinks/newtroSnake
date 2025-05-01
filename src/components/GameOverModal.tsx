import React from 'react';
import { Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../types/navigation';
import CustomButton from './common/CustomButton';

interface GameOverModalProps {
  isOpen: boolean;
  onRetry: () => void;
}

const GameOverModal = ({ isOpen, onRetry }: GameOverModalProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <Modal visible={isOpen} transparent={true}>
      <CustomButton onPress={onRetry} title='RETRY' />
      <CustomButton onPress={() => navigation.navigate('Home')} title='HOME' />
    </Modal>
  );
};

export default GameOverModal;
