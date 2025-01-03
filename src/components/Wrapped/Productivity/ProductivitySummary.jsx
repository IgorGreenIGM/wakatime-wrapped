import React from 'react';
import { FaClock, FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import { AbsoluteFill, Easing, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import "./ProductivitySummary.css";

const ProductivitySummary = ({ from = 0, stats }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Animation timing configurations
  const TIMINGS = {
    ROCKET: {
      INITIAL_DELAY: from,
      MOVE_DELAY: from + 100,
      MOVE_DURATION: 20,
    },
    TITLE: {
      FADE_IN_START: from + 360,
      DURATION: 1,
    },
    STATS: {
      BASE_DELAY: from + 100,
      STAGGER_DELAY: 20,
      FADE_OUT_START: from + 350,
    },
  };

  // Rocket animations
  const getRocketAnimations = () => ({
    scale: interpolate(
      frame,
      [TIMINGS.ROCKET.INITIAL_DELAY, TIMINGS.ROCKET.INITIAL_DELAY + 35],
      [0, 1],
      {
        easing: Easing.bounce,
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      }
    ),
    rotation: interpolate(
      frame,
      [TIMINGS.ROCKET.MOVE_DELAY + 20, TIMINGS.ROCKET.MOVE_DELAY + 40],
      [0, -45],
      {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      }
    ),
    verticalMove: interpolate(
      frame,
      [TIMINGS.ROCKET.MOVE_DELAY + 40, TIMINGS.ROCKET.MOVE_DELAY + 60],
      [0, -height / 1.25],
      {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
      }
    ),
  });

  // Text animations
  const getTextAnimations = () => ({
    mainText: {
      opacity: interpolate(
        frame,
        [from + 30, from + 50],
        [0, 1],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
      ) * interpolate(
        frame,
        [TIMINGS.ROCKET.MOVE_DELAY, TIMINGS.ROCKET.MOVE_DELAY + 20],
        [1, 0],
        { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
      ),
    },
    title: {
      delay: interpolate(
        frame,
        [TIMINGS.TITLE.FADE_IN_START, TIMINGS.TITLE.FADE_IN_START + fps * TIMINGS.TITLE.DURATION],
        [0, 1],
        { extrapolateRight: 'clamp' }
      ) * -TIMINGS.TITLE.DURATION,
    },
  });

  // Stats animations
  const getStatAnimations = (index) => ({
    opacity: interpolate(
      frame,
      [TIMINGS.STATS.BASE_DELAY + 40 + index * TIMINGS.STATS.STAGGER_DELAY, 
       TIMINGS.STATS.BASE_DELAY + 60 + index * TIMINGS.STATS.STAGGER_DELAY],
      [0, 1],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    ) * interpolate(
      frame,
      [TIMINGS.STATS.FADE_OUT_START + index * 2, TIMINGS.STATS.FADE_OUT_START + 20 + index * 2],
      [1, 0],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    ),
    translateY: interpolate(
      frame,
      [TIMINGS.STATS.BASE_DELAY + 40 + index * TIMINGS.STATS.STAGGER_DELAY,
       TIMINGS.STATS.BASE_DELAY + 60 + index * TIMINGS.STATS.STAGGER_DELAY],
      [20, 0],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    ),
    translateYDown: interpolate(
      frame,
      [TIMINGS.STATS.FADE_OUT_START + index * 5, TIMINGS.STATS.FADE_OUT_START + 70 + index * 5],
      [-100, 0],
      { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
    ),
  });

  const getStatIcon = (label, size = 120) => {
    const icons = {
      'Total Time Coded': FaClock,
      'Longest Coding Streak': FaTrophy,
      'Most Active Day': FaCalendarAlt,
    };
    const Icon = icons[label] || FaClock;
    return <Icon size={size} color="white" />;
  };

  const getRank = (totalHours) => {
    const ranks = [
      { threshold: 50, title: '💻 Apprentice Programmer' },
      { threshold: 100, title: '🛠️ Bug Squasher' },
      { threshold: 200, title: '⚡ Code Sorcerer' },
      { threshold: 500, title: '🚀 Syntax Overlord' },
      { threshold: 1000, title: '🌌 Debugging Demi-God' },
      { threshold: Infinity, title: '🏆 Infinite Loop Legend' },
    ];
    return ranks.find(rank => totalHours <= rank.threshold).title;
  };

  const rocketAnim = getRocketAnimations();
  const textAnim = getTextAnimations();

  return (
    <Sequence from={from} name="ProductivitySummary" durationInFrames={390}>
      <AbsoluteFill 
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: '60px',
        }}
      >
        {/* Rocket Animation */}
        <div
          style={{
            position: 'absolute',
            fontSize: '17.5rem',
            transform: `scale(${rocketAnim.scale}) translateY(${rocketAnim.verticalMove}px) rotate(${rocketAnim.rotation}deg)`,
          }}
        >
          🚀
        </div>

        {/* Main Text */}
        <div
          style={{
            opacity: textAnim.mainText.opacity,
            fontSize: '3rem',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            position: 'absolute',
            bottom: '25%',
          }}
        >
          Let's see how you've been productive this year
        </div>

        {/* Stats Container */}
        <div
          style={{
            transform: `translateY(${height / 8}px)`,
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          {stats.map((stat, index) => {
            const statAnim = getStatAnimations(index);
            
            return (
              <div
                key={stat.label}
                style={{
                  opacity: statAnim.opacity,
                  transform: `translateY(${statAnim.translateYDown}px) translateY(${statAnim.translateY}px)`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 40px 10px 40px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  border: '1px solid var(--accent-color)',
                }}
              >
                <div style={{ marginRight: '20px' }}>
                  {getStatIcon(stat.label)}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '2rem', marginBottom: '-1rem', fontWeight: 'bold', color: 'white' }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: '4rem', marginBottom: '-1rem', fontWeight: 'bold', color: 'var(--accent-color)' }}>
                    {stat.value}
                  </div>
                  {stat.subtext && (
                    <div style={{ fontSize: '1.5rem', color: '#D1D5DB' }}>
                      {stat.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Title */}
        <div 
          className="title animate-title-in"
          style={{
            animationPlayState: 'paused',
            animationDelay: `${textAnim.title.delay}s`,
            fontSize: '3.5rem',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            position: 'absolute',
            bottom: '80%',
          }}
        >
          🚀 Productivity Summary
        </div>

        {/* Rank Display */}
        {stats[0]?.label === "Total Time Coded" && (
          <div
            style={{
              opacity: getStatAnimations(stats.length).opacity,
              transform: `translateY(${getStatAnimations(stats.length).translateYDown}px) translateY(${getStatAnimations(stats.length).translateY}px)`,
              padding: '24px',
              position: 'absolute',
              bottom: `${width > height ? -5 : 5}%`,
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            <span style={{color:'white'}}>You're ranked </span> 
            <span style={{color:'var(--accent-color)'}}>{getRank(parseInt(stats[0].value.split(' ')[0]))}</span>
          </div>
        )}
      </AbsoluteFill>
    </Sequence>
  );
};

export default ProductivitySummary;