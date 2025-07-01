import React from 'react';
import { Dimensions } from 'react-native';

import styled, { useTheme } from 'styled-components/native';

import ScreenContainer from '../src/components/common/ScreenContainer';
import { getRandomColor } from '../src/utils/color';
import { StarDot } from '../styles/layout';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const STAR_NUMBER = 80;
const BUILDING_HEIGHTS = [45, 35, 40, 30, 50, 35, 40, 45, 25, 50];

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { windowColors, starColors } = useTheme();
  const stars = Array.from({ length: STAR_NUMBER }, (_, i) => ({
    id: i,
    top: Math.random() * (SCREEN_HEIGHT * 0.5),
    left: Math.random() * SCREEN_WIDTH,
    size: Math.random() * 2 + 1.2,
    opacity: Math.random() * 0.4 + 0.3,
    color: getRandomColor(starColors),
  }));
  const buildings = BUILDING_HEIGHTS.map((height) => {
    const floorCount = Math.floor(height / 5);
    const windows: { lit: boolean; color?: string }[][] = [];
    for (let i = 0; i < floorCount; i++) {
      const floorWindows = [
        Math.random() > 0.5
          ? { lit: true, color: getRandomColor(windowColors) }
          : { lit: false },
        Math.random() > 0.5
          ? { lit: true, color: getRandomColor(windowColors) }
          : { lit: false },
      ];
      windows.push(floorWindows);
    }
    return { height, windows };
  });

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
          {buildings.map((building, index) => (
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

export default HomeLayout;
