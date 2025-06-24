import React from 'react';
import { Modal, Text } from 'react-native';

import styled from 'styled-components/native';

import CustomText from './common/CustomText';

interface RoundClearModalProps {
  isOpen: boolean;
}

const RoundClearModal = ({ isOpen }: RoundClearModalProps) => {
  return (
    <Modal visible={isOpen} transparent={true}>
      <Container>
        <CustomText>CLEAR</CustomText>
      </Container>
    </Modal>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default RoundClearModal;
