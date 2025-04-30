import React from 'react';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import styled from 'styled-components/native';
import CustomButton from './common/CustomButton';

interface FailModalProps {
  isOpen: boolean;
}

const FailModal = ({ isOpen }: FailModalProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <Modal visible={isOpen} transparent={true}>
      <CustomButton onPress={() => 0} title='RETRY' />
      <CustomButton onPress={() => navigation.navigate('Home')} title='HOME' />
    </Modal>
  );
};

export default FailModal;
