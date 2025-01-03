import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig, Easing, Sequence } from 'remotion';

const RectangleTransition = ({
  color = 'var(--accent-color)',
  direction = 'bottom',
  from = 0,
  to = 40,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Calculate the translation dynamically based on direction
  const rectTranslate = interpolate(
    frame,
    [from, to],
    direction === 'left'
      ? [width, -width]
      : direction === 'right'
      ? [-width, width]
      : direction === 'bottom'
      ? [-height, height]
      : [height, -height], // Default assumes vertical swipe
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.easeInOutCubic, // Smooth easing
    }
  );

  const transform =
    direction === 'left' || direction === 'right'
      ? `translateX(${rectTranslate}px)`
      : `translateY(${rectTranslate}px)`;

  return (
    <Sequence from={from} to={to} durationInFrames={to - from} name={`Rectangle transition ${direction}`}>
        <div
        style={{
            position: 'absolute',
            width: direction === 'left' || direction === 'right' ? `${width}px` : '100%',
            height: direction === 'bottom' || direction === 'bottomToTop' ? `${height}px` : '100%',
            background: color,
            boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.5)', // Optional shadow
            transform,
        }}
        ></div>
    </Sequence>
  );
};

export default RectangleTransition;
