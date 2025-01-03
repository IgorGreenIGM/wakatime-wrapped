import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { Img, staticFile } from 'remotion';
import './Greetings.css';

const Greeting = ({ from = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Keep the original ZoomInDown animation timing
  const zoomInDownDuration = 1.5;
  const zoomInDownDelay = interpolate(
    frame - from, 
    [0, fps * zoomInDownDuration], 
    [0, 1], 
    { 
      extrapolateRight: 'clamp' 
    }
  ) * -zoomInDownDuration;

  // Logo Animation: Fade-in
  const logoOpacity = interpolate(
    frame - from,
    [0, 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Subtitle Animation: Fade-in
  const subtitleOpacity = interpolate(
    frame - from,
    [60, 80],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Content visibility toggle
  const contentVisible = frame < (from + 180);

  return (
    <Sequence from={from} name="Greetings" durationInFrames={180}>
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
                  width: '240px',
                  height: 'auto',
                }}
              />
            </div>

            {/* Title Section */}
            <div
              className="title-grettings animate-grettings-title-in"
              style={{
                animationPlayState: 'paused',
                animationDelay: `${zoomInDownDelay}s`,
                textAlign: 'center',
              }}
            >
              WakaTime Wrapped <br /> 2024
            </div>

            {/* Subtitle Section */}
            <div
              style={{
                opacity: subtitleOpacity,
                color: 'var(--accent-color)',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: '8px',
              }}
            >
              Your coding journey, visualized!
            </div>
          </div>
        )}
      </AbsoluteFill>
    </Sequence>
  );
};

export default Greeting;