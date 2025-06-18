import React from 'react';
import { Dimensions } from 'react-native';

import styled from 'styled-components/native';

import ScreenContainer from '../src/components/common/ScreenContainer';

interface CityPopNightBackgroundProps {
  children: React.ReactNode;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STAR_COLORS = [
  '#FFFFFF',
  '#00F0FF',
  '#FF77FF',
  '#C7AFFF',
  '#B0A8FF',
  '#AAF8FF',
];
const WINDOW_COLORS = ['#FFD580', '#FFE9A7', '#FFC0CB', '#87CEFA'];
const BUILDING_HEIGHTS = [45, 35, 40, 30, 50, 35, 40, 45, 25, 50];

const getRandomWindowColor = () =>
  WINDOW_COLORS[Math.floor(Math.random() * WINDOW_COLORS.length)];

const getRandomColor = () =>
  STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];

const BUILDINGS = BUILDING_HEIGHTS.map((height) => {
  const floorCount = Math.floor(height / 5);
  const windows: { lit: boolean; color?: string }[][] = [];
  for (let i = 0; i < floorCount; i++) {
    const floorWindows = [
      Math.random() > 0.5
        ? { lit: true, color: getRandomWindowColor() }
        : { lit: false },
      Math.random() > 0.5
        ? { lit: true, color: getRandomWindowColor() }
        : { lit: false },
    ];
    windows.push(floorWindows);
  }
  return { height, windows };
});

const generateStars = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * (SCREEN_HEIGHT * 0.5),
    left: Math.random() * SCREEN_WIDTH,
    size: Math.random() * 2 + 1.2,
    opacity: Math.random() * 0.4 + 0.3,
    color: getRandomColor(),
  }));

const CityPopNightBackground = ({ children }: CityPopNightBackgroundProps) => {
  const stars = generateStars(80);

  return (
    <ScreenContainer>
      {stars.map((star) => (
        <StarDot
          key={star.id}
          top={star.top}
          left={star.left}
          size={star.size}
          color={star.color}
          opacity={star.opacity}
        />
      ))}
      <NightBackground>
        <Sky>
          {BUILDINGS.map((building, index) => (
            <Building key={index} height={building.height}>
              {building.windows.map((floor, floorIndex) => (
                <Floor key={floorIndex}>
                  {floor.map((window, windowIndex) => (
                    <WindowDot
                      key={windowIndex}
                      lit={window.lit}
                      color={window.color}
                    />
                  ))}
                </Floor>
              ))}
            </Building>
          ))}
        </Sky>
      </NightBackground>
      {children}
    </ScreenContainer>
  );
};

interface StarDotProps {
  top: number;
  left: number;
  size: number;
  opacity: number;
  color: string;
}

interface BuildingProps {
  height: number;
}

interface WindowDotProps {
  lit: boolean;
  color?: string;
}

const NightBackground = styled.View`
  flex: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const Sky = styled.View`
  flex: 1;
  height: 100%;
  position: relative;
  flex-direction: row;
  align-items: flex-end;
  background-color: #0b0c38;
`;

const StarDot = styled.View<StarDotProps>(
  ({ top, left, size, color, opacity }: StarDotProps) => ({
    position: 'absolute',
    zIndex: 1,
    top,
    left,
    width: size,
    height: size,
    backgroundColor: color,
    opacity,
    borderRadius: 100,
  }),
);

const Building = styled.View<BuildingProps>((props: BuildingProps) => ({
  flex: 1,
  height: `${props.height}%`,
  backgroundColor: '#1E1E4A',
  borderRadius: 4,
}));

const Floor = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const WindowDot = styled.View<WindowDotProps>(
  ({ lit, color }: WindowDotProps) => ({
    width: '20%',
    aspectRatio: 1,
    backgroundColor: lit ? color : '#1F224F',
    borderRadius: 2,
  }),
);

export default CityPopNightBackground;
