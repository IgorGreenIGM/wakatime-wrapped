import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';

const ToolsAndEnvironments = ({ from, developmentTools, environments }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation utilities
  const getTitleAnimation = (delay = 0) => {
    const translateY = spring({
      frame: frame - (from + delay),
      from: -50,
      to: 0,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });

    const opacity = interpolate(
      frame,
      [from + delay, from + delay + 20],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

    return { translateY, opacity };
  };

  const getCircleProgress = (index, items, baseDelay = 0) => {
    const delay = baseDelay + index * 15;
    
    // Calculate the start angle based on previous items' percentages
    const startAngle = items.slice(0, index).reduce((sum, item) => sum + item.percentage, 0) * 3.6; // Convert percentage to degrees
    
    // Animate to the current item's percentage
    const progress = spring({
      frame: frame - (from + delay),
      from: 0,
      to: items[index].percentage * 3.6, // Convert percentage to degrees
      fps,
      config: {
        damping: 15,
        stiffness: 60,
      },
    });

    return {
      startAngle,
      progress,
    };
  };

  const getCircleOpacity = (index, baseDelay = 0) => {
    const delay = baseDelay + index * 15;
    return interpolate(
      frame,
      [from + delay, from + delay + 20],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );
  };

  const getLegendAnimation = (index, baseDelay = 0) => {
    const delay = baseDelay + index * 10;
    
    const translateX = spring({
      frame: frame - (from + delay),
      from: -50,
      to: 0,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });

    const opacity = interpolate(
      frame,
      [from + delay, from + delay + 20],
      [0, 1],
      { extrapolateRight: 'clamp' }
    );

    const scale = spring({
      frame: frame - (from + delay),
      from: 0.8,
      to: 1,
      fps,
      config: {
        damping: 12,
        stiffness: 100,
      },
    });

    return { translateX, opacity, scale };
  };

  // Helper function to create circular sector path
  const createSectorPath = (centerX, centerY, radius, startAngle, endAngle) => {
    // Convert angles from degrees to radians
    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (endAngle - 90) * Math.PI / 180;

    // Calculate points
    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);

    // Create arc flag
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    // Generate path
    return `M ${centerX} ${centerY}
            L ${startX} ${startY}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}
            Z`;
  };

  // Main title animation
  const mainTitleAnim = getTitleAnimation(0);

  return (
    <Sequence from={from} name="ToolsAndEnvironments" durationInFrames={380} >
      <AbsoluteFill
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          padding: '60px',
          alignItems: 'center',
          height:'60',
          justifyContent:'center',
          alignItems:'center'
        }}
      >
        {/* Main Title */}
        <div
          style={{
            transform: `translateY(${mainTitleAnim.translateY}px)`,
            opacity: mainTitleAnim.opacity,
            marginBottom: '60px',
            marginTop: '50px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: '4rem',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            🛠️ Development Environment
          </h1>
        </div>

        {/* Main content container */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1400px',
          gap: '60px',
        }}>
          {/* Tools Section */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Tools Title */}
            <div
              style={{
                opacity: getTitleAnimation(30).opacity,
                transform: `translateY(${getTitleAnimation(30).translateY}px)`,
                marginBottom: '40px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '2.8rem',
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Development Tools
              </h2>
            </div>

            {/* Tools Circular Diagram */}
            <div style={{ 
              position: 'relative',
              width: '400px',
              height: '400px',
              marginBottom: '40px',
            }}>
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {developmentTools.map((tool, index) => {
                  const { startAngle, progress } = getCircleProgress(index, developmentTools, 45);
                  const opacity = getCircleOpacity(index, 45);
                  const endAngle = startAngle + progress;
                  
                  return (
                    <path
                      key={tool.name}
                      d={createSectorPath(100, 100, 90, startAngle, endAngle)}
                      fill={tool.color}
                      style={{
                        opacity,
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  );
                })}
                
                {/* Center circle for better aesthetics */}
                <circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill="rgba(255, 255, 255, 0.1)"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />
              </svg>
            </div>

            {/* Tools Legend */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
              maxWidth: '500px',
            }}>
              {developmentTools.map((tool, index) => {
                const animation = getLegendAnimation(index, 90);
                
                return (
                  <div
                    key={tool.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      opacity: animation.opacity,
                      transform: `translateX(${animation.translateX}px) scale(${animation.scale})`,
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: tool.color,
                        marginRight: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                    <span style={{
                      color: 'white',
                      fontSize: '1.8rem',
                      flex: 1,
                    }}>
                      {tool.name}
                    </span>
                    <span style={{
                      color: 'white',
                      fontSize: '1.8rem',
                      opacity: 0.8,
                    }}>
                      {tool.hours}h ({tool.percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environments Section */}
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            {/* Environments Title */}
            <div
              style={{
                opacity: getTitleAnimation(45).opacity,
                transform: `translateY(${getTitleAnimation(45).translateY}px)`,
                marginBottom: '40px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '2.8rem',
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                Operating Systems
              </h2>
            </div>

            {/* Environments Circular Diagram */}
            <div style={{ 
              position: 'relative',
              width: '400px',
              height: '400px',
              marginBottom: '40px',
            }}>
              <svg
                viewBox="0 0 200 200"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              >
                {environments.map((env, index) => {
                  const { startAngle, progress } = getCircleProgress(index, environments, 60);
                  const opacity = getCircleOpacity(index, 60);
                  const endAngle = startAngle + progress;
                  
                  return (
                    <path
                      key={env.name}
                      d={createSectorPath(100, 100, 90, startAngle, endAngle)}
                      fill={env.color}
                      style={{
                        opacity,
                        filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                      }}
                    />
                  );
                })}
                
                {/* Center circle for better aesthetics */}
                <circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill="rgba(255, 255, 255, 0.1)"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  }}
                />
              </svg>
            </div>

            {/* Environments Legend */}
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
              maxWidth: '500px',
            }}>
              {environments.map((env, index) => {
                const animation = getLegendAnimation(index, 105);
                
                return (
                  <div
                    key={env.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      opacity: animation.opacity,
                      transform: `translateX(${animation.translateX}px) scale(${animation.scale})`,
                    }}
                  >
                    <div
                      style={{
                        width: '16px',
                        height: '16px',
                        backgroundColor: env.color,
                        marginRight: '12px',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                    <span style={{
                      color: 'white',
                      fontSize: '1.8rem',
                      flex: 1,
                    }}>
                      {env.name}
                    </span>
                    <span style={{
                      color: 'white',
                      fontSize: '1.8rem',
                      opacity: 0.8,
                    }}>
                      {env.percentage}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export default ToolsAndEnvironments;