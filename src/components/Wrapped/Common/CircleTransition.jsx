import React from 'react';
import { Circle } from "@remotion/shapes";
import { interpolate, useCurrentFrame, useVideoConfig, Easing, Sequence, AbsoluteFill } from 'remotion';

const CircleTransition = ({
  color = 'var(--accent-color)',
  from = 0,
  to = 40,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Calculate animation parameters
  const duration = to - from;
  const radius = Math.max(width, height);
  const midFrame = from + duration / 2;

  // Interpolate circle scale based on animation phase
  const getCircleScale = (startFrame, endFrame, startRadius, endRadius) => {
    return interpolate(
      frame,
      [startFrame, endFrame],
      [startRadius, endRadius],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );
  };

  // Calculate current radius based on animation phase
  const currentRadius = frame < midFrame
    ? getCircleScale(from, midFrame, 0, radius)
    : getCircleScale(midFrame, to, radius, 0);

  return (
    <Sequence 
      from={from} 
      durationInFrames={duration} 
      name="Circle transition"
    >
      <AbsoluteFill
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Circle
          radius={currentRadius}
          fill={color}
        />
      </AbsoluteFill>
    </Sequence>
  );
};

export default CircleTransition;