import React from 'react';
import { Modal, Text } from 'react-native';

import styled from 'styled-components/native';

interface RoundClearModalProps {
  isOpen: boolean;
}

const RoundClearModal = ({ isOpen }: RoundClearModalProps) => {
  return (
    <Modal visible={isOpen} transparent={true}>
      <Container>
        <Text>CLEAR!</Text>
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
