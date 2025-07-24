import React from 'react';
import { Modal } from 'react-native';

import styled from 'styled-components/native';

import CustomText from './common/CustomText';

interface RoundClearModalProps {
  isOpen: boolean;
}

const RoundClearModal = ({ isOpen }: RoundClearModalProps) => {
  return (
    <Modal visible={isOpen} transparent={true}>
      <Overlay>
        <ModalBox>
          <ClearText>CLEAR</ClearText>
          <SnakeRow>
            <SnakeBody />
            <SnakeBody />
            <SnakeBody />
            <SnakeBody />
          </SnakeRow>
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
  background-color: ${({ theme }: { theme: any }) => theme.colors.background};
  align-items: center;
  border-radius: 4px;
  padding: 32px 0 32px 0;
  border-width: 2px;
  border-color: ${({ theme }: { theme: any }) => theme.colors.text};
`;

const ClearText = styled(CustomText)`
  font-size: 36px;
  color: ${({ theme }: { theme: any }) => theme.colors.text};
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
  background-color: ${({ theme }: { theme: any }) => theme.colors.text};
`;

export default RoundClearModal;
