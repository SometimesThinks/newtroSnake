import React from 'react';
import {
  Directions,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

import styled from 'styled-components/native';

interface GameInputProps {
  onSwipe: (direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT') => void;
}

const GameInput = ({ onSwipe }: GameInputProps) => {
  const flingGesture = Gesture.Simultaneous(
    Gesture.Fling()
      .direction(Directions.UP)
      .onEnd(() => onSwipe('UP')),
    Gesture.Fling()
      .direction(Directions.DOWN)
      .onEnd(() => onSwipe('DOWN')),
    Gesture.Fling()
      .direction(Directions.LEFT)
      .onEnd(() => onSwipe('LEFT')),
    Gesture.Fling()
      .direction(Directions.RIGHT)
      .onEnd(() => onSwipe('RIGHT')),
  );

  return (
    <GestureDetector gesture={flingGesture}>
      <GestureView />
    </GestureDetector>
  );
};

const GestureView = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default GameInput;
