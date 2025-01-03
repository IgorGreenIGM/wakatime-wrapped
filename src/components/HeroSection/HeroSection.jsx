import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { fetchAuthorizationUrl } from '../../services/Api';

import gsap from 'gsap';
import './HeroSection.css';

const HeroSection = () => {
    const languageChartRef = useRef(null);
    
    useEffect(() => {
      // Reset initial states
      gsap.set("#title", { x: -50, opacity: 0 });
      gsap.set("#subtitle", { x: -50, opacity: 0 });
      gsap.set(".cta", { opacity: 0, y: 20 });
      gsap.set(".stat-card", { opacity: 0, y: 20 });
      
      // Initialize language bars to 0 height
      const bars = document.querySelectorAll('.lang-bar');
      bars.forEach(bar => {
        const targetHeight = bar.getAttribute('data-height');
        gsap.set(bar, { height: 0 });
        gsap.to(bar, {
          height: targetHeight,
          duration: 1,
          ease: "power2.out",
          delay: 1
        });
      });
  
      // GSAP Timeline for coordinated animations
      const tl = gsap.timeline();
      
      tl.to("#title", {
        duration: 1.5,
        x: 0,
        opacity: 1,
        ease: "power3.out"
      })
      .to("#subtitle", {
        duration: 1,
        x: 0,
        opacity: 1,
        ease: "power3.out"
      }, "-=1")
      .to(".cta", {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: "power2.out"
      }, "-=0.5")
      .to(".stat-card", {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.5");
  
      // Animate numbers
      document.querySelectorAll('.streak-number').forEach((number, index) => {
        const finalNumber = parseInt(number.textContent);
        let currentNumber = 0;
        const duration = 2000; // 2 seconds
        const interval = duration / finalNumber;

        const counter = setInterval(() => {
            currentNumber++;
            number.textContent = currentNumber;
            if (currentNumber === finalNumber) {
                clearInterval(counter);
            }
        }, interval);
      });
  
      return () => {
        tl.kill();
      };
    }, []);
    
    const handleButtonClick = () => {
        if (localStorage.getItem('wakatime-access-token')) {
            window.location.href = '/stats';
            return true;
        }

        try {
            const button = document.getElementById('cta-btn');
            if (button) {
                button.disabled = true;
                button.textContent = 'Loading...';
            }
            
            fetchAuthorizationUrl().then(response => {
                console.error('the content will follow : ', response);
                window.location.href = response;
            }).catch(error => {
                console.error('Failed to fetch authorization URL:', error);
                alert('Failed to connect to WakaTime. Please try again later.');
            });            
        } catch (error) {
            const button = document.getElementById('cta-btn');
            if (button) {
                button.disabled = false;
                button.textContent = 'View Your Stats';
            }
            console.error('Failed to fetch authorization URL:', error);

            alert('Failed to connect to WakaTime. Please try again later.');
        }
    };

    return (
      <div className="hero-section">
        <div className="hero-content">
          <h1 id="title">WakaTime Wrapped</h1>
          <h2 id="subtitle">Your Coding Journey Visualized</h2>
          {/* <Link to="/stats"> */}
            <button className="cta" id="cta-btn"
            onClick={handleButtonClick}>
                View Your Stats
            </button>
          {/* </Link> */}
        </div>
        <div className="hero-animation">
          <div className="stats-header">Discover your 2024 Coding Stats</div>
          <div className="stat-container">
            <h3>Language Distribution</h3>
            <div className="language-chart" ref={languageChartRef}>
              <div className="lang-bar" data-height="80%">
                <div className="lang-hours">120h</div>
                <div className="lang-label">Python</div>
              </div>
              <div className="lang-bar" data-height="60%">
                <div className="lang-hours">90h</div>
                <div className="lang-label">JavaScript</div>
              </div>
              <div className="lang-bar" data-height="40%">
                <div className="lang-hours">60h</div>
                <div className="lang-label">HTML/CSS</div>
              </div>
              <div className="lang-bar" data-height="30%">
                <div className="lang-hours">45h</div>
                <div className="lang-label">Java</div>
              </div>
            </div>
          </div>
  
        <div class="streak-container">
            <div class="streak-box">
                <div class="streak-number">315</div>
                <div class="streak-label">Total Hours</div>
            </div>
            <div class="streak-box">
                <div class="streak-number">45</div>
                <div class="streak-label">Longest Streak</div>
            </div>
            <div class="streak-box">
                <div class="streak-number">15</div>
                <div class="streak-label">Projects</div>
            </div>
        </div>
        </div>
      </div>
    );
  };
  
  export default HeroSection;