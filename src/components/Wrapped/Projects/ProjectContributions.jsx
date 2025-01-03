import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const ProjectContributions = ({ from, projects, newProjects }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const totalHours = projects.reduce((sum, project) => sum + project.hours, 0);

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
      to: (projects[index].hours / Math.max(...projects.map(p => p.hours))) * maxWidth,
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
    <Sequence from={from} name="ProjectContributions" durationInFrames={320}>
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
            📊 Project Contributions
          </h1>
        </div>

        {/* Chart Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {projects.map((project, index) => (
            <div
              key={project.name}
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
                {project.icon}
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
                    backgroundColor: project.color,
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
                  {project.name}
                  <span style={{ fontWeight: 'normal', opacity: 0.8 }}>
                    {Math.round(getPercentageValue(project.hours, index))}%
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
                  {project.hours}h
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Projects Legend */}
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
            ✨ Top New Projects Started
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            {newProjects.length > 0 ? (
              newProjects.map((project, index) => (
                <div
                  key={`new-${project.name}`}
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
                      backgroundColor: 'var(--accent-color)',
                    }}
                  />
                  <span style={{ color: 'white', fontSize: '1.5rem' }}>
                    {project.name}
                  </span>
                </div>
              ))
            ) : (
              <div style={{ color: '#888', fontSize: '1.5rem', fontStyle: 'italic' }}>
                No new projects started this year
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export default ProjectContributions;