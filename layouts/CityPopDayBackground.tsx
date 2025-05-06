import React from 'react';

import styled from 'styled-components/native';

import ScreenContainer from '../src/components/common/ScreenContainer';

interface CityPopDayBackgroundProps {
  children: React.ReactNode;
}

const CityPopDayBackground = ({ children }: CityPopDayBackgroundProps) => {
  return (
    <ScreenContainer>
      <DayBackground>
        <FlexBox>
          <HandleBar></HandleBar>
          <OutsideBox></OutsideBox>
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
  background-color: #89ddf5;
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
  height: 60%;
  background-color: #2c2c54;
  border-radius: 10px;
`;

const Seat = styled.View`
  width: 100%;
  height: 40%;
  background-color: #2c2c54;
  border-radius: 10px;
`;

export default CityPopDayBackground;
