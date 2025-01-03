import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Img, staticFile } from 'remotion';
import './Thanks.css';

const Thanks = ({ from = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo Animation: Fade-in
  const logoOpacity = interpolate(
    frame - from,
    [20, 50],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Thanks Text Animation: Fade-in and slide-up
  const thanksOpacity = interpolate(
    frame - from,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const thanksTranslateY = interpolate(
    frame - from,
    [0, 30],
    [50, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtitle Animation: Fade-in
  const subtitleOpacity = interpolate(
    frame - from,
    [40, 60],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Content visibility toggle
  const contentVisible = frame < (from + 200);

  return (
    <Sequence from={from} name="Thanks" durationInFrames={200}>
      <AbsoluteFill
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {contentVisible && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              gap: '32px',
            }}
          >
            {/* Logo Section */}
            <div
              style={{
                opacity: logoOpacity,
                marginBottom: '16px',
              }}
            >
              <Img
                src={staticFile('/wakatime-white-logo.svg')}
                alt="WakaTime Logo"
                style={{
                  width: '200px',
                  height: 'auto',
                }}
              />
            </div>

            {/* Thanks Text Section */}
            <div
              className="thanks-title"
              style={{
                opacity: thanksOpacity,
                transform: `translateY(${thanksTranslateY}px)`,
                textAlign: 'center',
              }}
            >
              Thanks for Watching!
            </div>

            {/* Subtitle Section */}
            <div
              className="thanks-subtitle"
              style={{
                opacity: subtitleOpacity,
                textAlign: 'center',
                marginTop: '-20px',
              }}
            >
              See you next year in WakaTime Wrapped!
            </div>
          </div>
        )}
      </AbsoluteFill>
    </Sequence>
  );
};

export default Thanks;