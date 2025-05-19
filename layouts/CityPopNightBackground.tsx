import React from 'react';

import styled from 'styled-components/native';

import ScreenContainer from '../src/components/common/ScreenContainer';

interface CityPopNightBackgroundProps {
  children: React.ReactNode;
}

const BUILDING_HEIGHTS = [45, 35, 40, 30, 50, 35, 40, 45, 25, 50];

const BUILDINGS = BUILDING_HEIGHTS.map((height) => {
  const floorCount = Math.floor(height / 5);
  const windows: number[][] = [];
  for (let i = 0; i < floorCount; i++) {
    const floorWindows = [
      Math.random() > 0.5 ? 1 : 0,
      Math.random() > 0.5 ? 1 : 0,
    ];
    windows.push(floorWindows);
  }
  return { height, windows };
});

const CityPopNightBackground = ({ children }: CityPopNightBackgroundProps) => {
  return (
    <ScreenContainer>
      <DayBackground>
        <FlexBox>
          <HandleBar></HandleBar>
          <OutsideBox>
            {BUILDINGS.map((building, index) => (
              <Building key={index} height={building.height}>
                {building.windows.map((floor, floorIndex) => (
                  <Floor key={floorIndex}>
                    {floor.map((window, windowIndex) => (
                      <WindowDot key={windowIndex} lit={window === 1} />
                    ))}
                  </Floor>
                ))}
              </Building>
            ))}
          </OutsideBox>
          <InsideBox>
            <WindowBar />
            <ChairBox>
              <Chair>
                <BackSeat />
                <Seat />
              </Chair>
              <Chair>
                <BackSeat />
                <Seat />
              </Chair>
            </ChairBox>
          </InsideBox>
        </FlexBox>
      </DayBackground>
      {children}
    </ScreenContainer>
  );
};

const DayBackground = styled.View`
  position: absolute;
  background-color: #f4f4f4;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const FlexBox = styled.View`
  flex: 1;
`;

const HandleBar = styled.View`
  flex: 1;
`;

const OutsideBox = styled.View`
  flex: 5;
  width: 80%;
  align-self: center;
  border-radius: 10px;
  flex-direction: row;
  align-items: flex-end;
`;

const InsideBox = styled.View`
  flex: 3;
`;

const WindowBar = styled.View`
  flex: 1;
`;

const ChairBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Chair = styled.View`
  flex: 1;
`;

const BackSeat = styled.View`
  height: 70%;
  background-color: #2c2c54;
  border-radius: 10px;
`;

const Seat = styled.View`
  width: 100%;
  height: 30%;
  background-color: #2c2c54;
  border-radius: 10px;
`;

const Building = styled.View<{ height: number }>`
  flex: 1;
  height: ${({ height }) => height}%;
  background-color: #2d2d5d;
`;

const Floor = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const WindowDot = styled.View<{ lit: number }>`
  width: 20%;
  aspect-ratio: 1;
  background-color: ${({ lit }) => (lit ? '#00F0FF' : '')};
`;

export default CityPopNightBackground;
