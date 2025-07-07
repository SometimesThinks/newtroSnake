import React from 'react';
import { Modal } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../types/navigation';
import CustomButton from './common/CustomButton';
import CustomText from './common/CustomText';

interface GameOverModalProps {
  isOpen: boolean;
  onRetry: () => void;
  score: number;
}

const GameOverModal = ({ isOpen, onRetry, score = 12 }: GameOverModalProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  return (
    <Modal visible={isOpen} transparent>
      <Overlay>
        <ModalBox>
          <GameOverText>GAME OVER</GameOverText>
          <SnakeRow>
            <SnakeBody />
            <SnakeBody />
            <SnakeBody />
            <SnakeBody />
          </SnakeRow>
          <ScoreText>{score}</ScoreText>
          <ButtonBox>
            <CustomButton title='RETRY' onPress={onRetry} />
            <CustomButton
              title='HOME'
              onPress={() => navigation.navigate('Home')}
            />
          </ButtonBox>
        </ModalBox>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: 85%;
  background-color: ${({ theme }) => theme.colors.background};
  align-items: center;
  border-radius: 4px;
  padding: 32px 0 32px 0;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.text};
`;

const GameOverText = styled(CustomText)`
  font-size: 36px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 24px;
`;

const SnakeRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

const SnakeBody = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.text};
`;

const ScoreText = styled(CustomText)`
  font-size: 60px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 32px;
`;

const ButtonBox = styled.View`
  width: 80%;
  align-items: center;
  gap: 16px;
`;

export default GameOverModal;
