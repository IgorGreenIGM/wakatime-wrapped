import React, { useEffect } from 'react';
import gsap from 'gsap';
import './StatsPreview.css';

const StatsPreview = () => {
  useEffect(() => {
    gsap.to(".stat-card", {
      duration: 1,
      opacity: 1,
      y: 0,
      stagger: 0.2,
      delay: 1,
      ease: "power3.out"
    });
  }, []);

  return (
    <section className="section">
      <div className="stats-preview">
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <h3 className="stat-title">Total Coding Time</h3>
          <p className="stat-description">Track your total hours spent coding, longest streaks, and most productive days.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔤</div>
          <h3 className="stat-title">Language Analysis</h3>
          <p className="stat-description">Discover your most-used programming languages and see your language diversity grow.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <h3 className="stat-title">Time Distribution</h3>
          <p className="stat-description">Visualize your coding patterns with detailed heatmaps and productivity insights.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <h3 className="stat-title">Personal Bests</h3>
          <p className="stat-description">Celebrate your achievements with highlights of your most productive moments.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <h3 className="stat-title">Streaks</h3>
          <p className="stat-description">Keep track of your longest coding streaks and maintain your momentum.</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔋</div>
          <h3 className="stat-title">Energy Levels</h3>
          <p className="stat-description">Analyze your energy levels during coding sessions and optimize your workflow.</p>
        </div>
      </div>
    </section>
  );
};

export default StatsPreview;