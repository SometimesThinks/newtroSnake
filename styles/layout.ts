import styled from 'styled-components/native';

interface StarDotProps {
  top: number;
  left: number;
  size: number;
  opacity: number;
  color: string;
}

export const StarDot = styled.View<StarDotProps>(
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
