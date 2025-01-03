import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing, Sequence } from 'remotion';

const MotionRevealTransition = ({
  color = 'var(--accent-color)',
  direction = 'bottom',
  from = 0,
  to = 40,
  type = 'slide',
  segments = 1,
  stagger = 2,
  blur = false,
  rotation = false,
  exitDelay = 20  // Delay before exit animation starts
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const segments_array = useMemo(() => Array.from({ length: segments }, (_, i) => i), [segments]);

  const getTransformForDirection = (progress, index = 0) => {
    const staggerOffset = index * stagger;
    const adjustedFrame = frame - staggerOffset;
    const exitStart = to + exitDelay;
    const exitEnd = exitStart + (to - from);
    
    // Calculate enter and exit progress separately
    const enterProgress = interpolate(
      adjustedFrame,
      [from, to],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.easeInOutCubic,
      }
    );

    const exitProgress = interpolate(
      adjustedFrame,
      [exitStart, exitEnd],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.easeInOutCubic,
      }
    );

    const baseTransforms = [];

    // Position transform
    if (type === 'slide') {
      const distance = direction === 'left' || direction === 'right' ? width : height;
      const initialPosition = direction === 'right' || direction === 'bottom' ? distance : -distance;
      
      // Calculate enter movement
      const enterMovement = interpolate(enterProgress, [0, 1], [initialPosition, 0]);
      
      // Calculate exit movement
      const exitMovement = interpolate(exitProgress, [0, 1], [0, -initialPosition]);
      
      // Combine movements
      const finalMovement = exitProgress > 0 ? exitMovement : enterMovement;
      
      baseTransforms.push(
        direction === 'left' || direction === 'right'
          ? `translateX(${finalMovement}px)`
          : `translateY(${finalMovement}px)`
      );
    }

    // Scale transform
    if (type === 'scale') {
      const enterScale = interpolate(enterProgress, [0, 1], [0, 1]);
      const exitScale = interpolate(exitProgress, [0, 1], [1, 0]);
      const finalScale = exitProgress > 0 ? exitScale : enterScale;
      baseTransforms.push(`scale(${finalScale})`);
    }

    // Rotation
    if (rotation) {
      const enterRotate = interpolate(enterProgress, [0, 1], [0, 360]);
      const exitRotate = interpolate(exitProgress, [0, 1], [360, 720]);
      const finalRotate = exitProgress > 0 ? exitRotate : enterRotate;
      baseTransforms.push(`rotate(${finalRotate}deg)`);
    }

    return baseTransforms.join(' ');
  };

  const getSegmentStyle = (index) => {
    const segmentWidth = direction === 'left' || direction === 'right' 
      ? width / segments 
      : width;
    const segmentHeight = direction === 'top' || direction === 'bottom' 
      ? height / segments 
      : height;
    
    const enterOpacity = interpolate(
      frame,
      [from + index * stagger, from + index * stagger + (to - from) * 0.5],
      [0, 1],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );

    const exitOpacity = interpolate(
      frame,
      [to + exitDelay + index * stagger, to + exitDelay + (to - from) + index * stagger],
      [1, 0],
      {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      }
    );

    return {
      position: 'absolute',
      width: `${segmentWidth}px`,
      height: `${segmentHeight}px`,
      background: color,
      left: direction === 'left' || direction === 'right' 
        ? `${(index * segmentWidth)}px` 
        : 0,
      top: direction === 'top' || direction === 'bottom' 
        ? `${(index * segmentHeight)}px` 
        : 0,
      opacity: frame > to + exitDelay ? exitOpacity : enterOpacity,
      transform: getTransformForDirection(frame, index),
      filter: blur ? `blur(${interpolate(frame, [from, to], [10, 0])}px)` : 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    };
  };

  return (
    <Sequence from={from} to={to + exitDelay + (to - from)} durationInFrames={to - from + exitDelay + (to - from)} name={`Motion reveal transition ${direction}`}>
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {segments_array.map((index) => (
          <div
            key={index}
            style={getSegmentStyle(index)}
          />
        ))}
      </div>
    </Sequence>
  );
};

export default MotionRevealTransition;