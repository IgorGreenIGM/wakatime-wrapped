import React from 'react';
import { Circle } from "@remotion/shapes";
import { interpolate, useCurrentFrame, useVideoConfig, Sequence, AbsoluteFill } from 'remotion';

const CirclesTransitions = ({
  color1 = 'var(--accent-color)',
  color2 = 'var(--white)',
  color3 = 'var(--accent-color)',
  from = 0,
  to = 40,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Animation configuration
  const frameCount = to - from;
  const radius = Math.max(width, height);
  const midFrame = from + frameCount / 2;
  const deltaOffset = frameCount * 0.1; // 10% of animation duration

  // Calculate circle scale based on animation parameters
  const getCircleScale = (delta, startFrame, endFrame, startRadius, endRadius) => {
    return interpolate(
      frame,
      [startFrame + delta, endFrame],
      [startRadius, endRadius],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  };

  // Calculate radius for each phase of the animation
  const calculateRadius = (offset) => {
    if (frame < midFrame) {
      return getCircleScale(offset, from, midFrame, 0, radius);
    }
    return getCircleScale(offset, midFrame, to, radius, 0);
  };

  // Circle configuration array for cleaner rendering
  const circles = [
    { color: color1, offset: 0 },
    { color: color2, offset: deltaOffset },
    { color: color3, offset: deltaOffset * 2 },
  ];

  return (
    <Sequence from={from} durationInFrames={frameCount} name="Circle transition">
      {circles.map((circle, index) => (
        <AbsoluteFill
          key={index}
          style={{
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Circle
            radius={calculateRadius(circle.offset)}
            fill={circle.color}
          />
        </AbsoluteFill>
      ))}
    </Sequence>
  );
};

export default CirclesTransitions;