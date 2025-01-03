import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const LanguageUsage = ({ from, languages=[], newLanguages=[] }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const totalHours = languages.reduce((sum, lang) => sum + lang.hours, 0);

  // Enhanced title animation with slide and fade
  const titleTranslateY = spring({
    frame: frame - from,
    from: -50,
    to: 0,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    }
  });

  const titleOpacity = interpolate(
    frame,
    [from, from + 20],
    [0, 1],
    {
      extrapolateRight: 'clamp',
    }
  );

  // Background bar animations
  const getBackgroundBarWidth = (index) => {
    const baseDelay = from + 30;
    const staggerDelay = 10;
    
    return spring({
      frame: frame - (baseDelay + index * staggerDelay),
      from: 0,
      to: width * (width > height ? 0.8 : 0.7), // Increased to 80% of screen width
      fps,
      config: {
        damping: 12,
        stiffness: 90,
      }
    });
  };

  const getBackgroundBarOpacity = (index) => {
    const baseDelay = from + 30;
    const staggerDelay = 10;
    
    return interpolate(
      frame,
      [baseDelay + index * staggerDelay, baseDelay + 20 + index * staggerDelay],
      [0, 1],
      {
        extrapolateRight: 'clamp',
      }
    );
  };

  // Bar chart animations
  const getBarWidth = (index) => {
    const maxWidth = width * (width > height ? 0.8 : 0.7); // Increased to match background width
    const baseDelay = from + 45;
    const staggerDelay = 15;

    return spring({
      frame: frame - (baseDelay + index * staggerDelay),
      from: 0,
      to: (languages[index].hours / Math.max(...languages.map(l => l.hours))) * maxWidth,
      fps,
      config: {
        damping: 15,
        stiffness: 80,
      }
    });
  };

  const getBarLabelOpacity = (index) => {
    return interpolate(
      frame,
      [from + 60 + index * 15, from + 90 + index * 15],
      [0, 1],
      {
        extrapolateRight: 'clamp',
      }
    );
  };

  const legendOpacity = interpolate(
    frame,
    [from + 120, from + 150],
    [0, 1],
    {
      extrapolateRight: 'clamp',
    }
  );

  const getLegendTranslateY = (index) => {
    return interpolate(
      frame,
      [from + 150 + index * 10, from + 180 + index * 10],
      [20, 0],
      {
        extrapolateRight: 'clamp',
      }
    );
  };

  const getPercentageValue = (hours, index) => {
    return interpolate(
      frame,
      [from + 60 + index * 15, from + 90 + index * 15],
      [0, (hours / totalHours) * 100],
      {
        extrapolateRight: 'clamp',
      }
    );
  };

  return (
    <Sequence from={from} name="LanguageUsage" durationInFrames={320}>
      <AbsoluteFill 
        className="bg-transparent"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
        }}
      >
        {/* Enhanced Title Section */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleTranslateY}px)`,
            textAlign: 'center',
            marginBottom: '80px',
          }}
        >
          <h1
            style={{
              fontSize: '3.5rem',
              color: 'white',
              fontWeight: 'bold',
              marginBottom: '20px',
              marginTop: `${width > height ? 40 : 200}px`,
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            📙 Languages Breakdown
          </h1>
        </div>

        {/* Chart Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: '120px',
                  display: 'flex',
                  justifyContent: 'center',
                  opacity: getBarLabelOpacity(index),
                }}
              >
                {lang.icon}
              </div>

              {/* Bar Container */}
              <div style={{ flex: 1, position: 'relative', height: '60px' }}>
                {/* Animated Background Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '60px',
                    width: getBackgroundBarWidth(index),
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    opacity: getBackgroundBarOpacity(index),
                  }}
                />

                {/* Animated Colored Bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '60px',
                    width: getBarWidth(index),
                    backgroundColor: lang.color,
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  }}
                />

                {/* Label */}
                <div
                  style={{
                    position: 'absolute',
                    left: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '2.25rem',
                    fontWeight: 'bold',
                    opacity: getBarLabelOpacity(index),
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  {lang.name}
                  <span style={{ fontWeight: 'normal', opacity: 0.8 }}>
                    {Math.round(getPercentageValue(lang.hours, index))}%
                  </span>
                </div>

                {/* Hours */}
                <div
                  style={{
                    position: 'absolute',
                    right: '90px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'white',
                    fontSize: '2.25rem',
                    opacity: getBarLabelOpacity(index),
                  }}
                >
                  {lang.hours}h
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Languages Legend */}
        <div
          style={{
            position: 'relative',
            bottom:`${width>height ? 0:400}px`,
            marginLeft: '-20px',
            marginTop: '40px',
            opacity: legendOpacity,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            ✨ Top New Languages Learned
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {newLanguages.length > 0 ? (
              newLanguages.map((lang, index) => (
                <div
                  key={`new-${lang.name}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transform: `translateY(${getLegendTranslateY(index)}px)`,
                  }}
                >
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '3px',
                      backgroundColor: lang.color,
                    }}
                  />
                  <span style={{ color: 'white', fontSize: '1.5rem' }}>
                    {lang.name}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', fontSize: '1.5rem', fontStyle: 'italic' }}>
                No new languages learned this year
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export default LanguageUsage;