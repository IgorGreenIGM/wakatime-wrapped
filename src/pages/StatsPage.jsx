import React, { useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import { FaDownload, FaGithub } from 'react-icons/fa';
import { fetchUserData, fetchCard } from '../services/Api';
import Footer from '../components/Footer/Footer';
import WakatimeWrapped from '../components/Wrapped/WakatimeWrapped';

const StatsPage = () => {
  const accessToken = localStorage.getItem('wakatime-access-token');
  const [backendData, setBackendDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!accessToken) {
    return (
      <div
        style={{
          margin: '0 auto',
          alignItems: 'center',
          marginTop:'300px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <button 
          style={{
            backgroundColor: 'var(--accent-color)',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
          onClick={() => {
            window.location.pathname = '/';
          }}
        >
          Back to Main Page
        </button>
        <div>
          <h1 style={{color: 'white', marginTop: '20px', textAlign:'center'}}>You need to grant acess to your wakatime<br></br> account to fetch statistics</h1>
        </div>
        <div>
          <h1 style={{color: 'white', fontSize:'20px', marginTop: '20px', textAlign:'center'}}>Go back to the main page and click "View Your Stats" Button</h1>
        </div>
      </div>
    );
  }

  useEffect(() => {
    setIsLoading(true);
    fetchUserData(accessToken)
      .then((data) => {
        setBackendDatas(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        window.alert("error when fetching backend data, please try again later");
        setIsLoading(false);
        window.location.href = '/';
      });
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Loading component with animation
  const LoadingAnimation = () => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      gap: '20px'
    }}>
      <div style={{
        display: 'flex',
        gap: '15px'
      }}>
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: 'var(--accent-color)',
              borderRadius: '50%',
              animation: 'pulse 1.5s ease-in-out infinite',
              animationDelay: `${(index - 1) * 0.2}s`,
            }}
          />
        ))}
      </div>
      <p style={{
        color: 'white',
        fontSize: '1.1rem',
        margin: 0
      }}>
        Loading your stats...
      </p>
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            50% {
              transform: scale(1.2);
              opacity: 1;
            }
            100% {
              transform: scale(0.8);
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );

  const videoConfig = {
    durationInFrames: 2300,
    fps: 30,
    width: isMobile ? 1080 : 1750,
    height: isMobile ? 1750 : 1080,
  };

  const videoComponent = () => {
    return (
      <WakatimeWrapped backendData={backendData} />
    );
  }

  const borderRadius = 12;
  const playerScale = 1;
  
  const PlayerWrapper = () => (
    <div style={{
      transform: `scale(${playerScale})`,
      transformOrigin: 'top left',
      width: `${100 / playerScale}%`,
      height: `${100 / playerScale}%`,
    }}>
      <Player
        component={videoComponent}
        durationInFrames={videoConfig.durationInFrames}
        fps={videoConfig.fps}
        compositionWidth={videoConfig.width}
        compositionHeight={videoConfig.height}
        controls
        style={{
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          borderRadius: `${borderRadius}px`
        }}
      />
    </div>
  );

  // Main container that's shown while loading or with content
  return (
    <div>
      <div
        style={{
          margin: '0 auto',
          marginTop: isMobile ? '200px' : '100px',
          width: isMobile ? '68%' : '60%',
          height: isMobile ? '540px' : '560px',
          border: "1px solid var(--accent-color)",
          borderRadius: `${borderRadius}px`,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          background: 'rgba(0, 0, 0, 0.8)',
        }}
      >
        {isLoading ? (
          <LoadingAnimation />
        ) : (
          <>
            {/* Profile Section */}
            <div
              style={{
                background: 'var(--accent-color)',
                padding: '8px 10px',
                borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* Profile Section */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '5px' : '16px',
                }}
              >
                <img
                  src={backendData.profile_picture_url}
                  alt="Profile"
                  style={{
                    width: isMobile ? '40px' : '50px',
                    height: isMobile ? '40px' : '50px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid white',
                  }}
                />
                <p
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: isMobile ? '1rem' : '1.25rem',
                    margin: 0,
                  }}
                >
                  {backendData.username}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: isMobile ? '8px' : '12px',
                }}
              >
                {/* Download Button */}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: isMobile ? '35px' : '40px',
                    height: isMobile ? '35px' : '40px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                    e.currentTarget.querySelector('svg').style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.querySelector('svg').style.color = 'var(--accent-color)';
                  }}
                  onClick={() => {
                    fetchCard(accessToken).then(() => {
                      console.log('Downloaded!');
                    }).catch((err) => {
                      console.error(err);
                      alert('Error downloading the card. Please try again later.\n'+err);
                    });
                  }}
                >
                  <FaDownload
                    style={{
                      width: isMobile ? '16px' : '20px',
                      height: isMobile ? '16px' : '20px',
                      color: 'var(--accent-color)',
                    }}
                  />
                </button>

                {/* Share Button */}
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    width: isMobile ? '35px' : '40px',
                    height: isMobile ? '35px' : '40px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--accent-color)';
                    e.currentTarget.querySelector('svg').style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.querySelector('svg').style.color = 'var(--accent-color)';
                  }}

                  onClick={() => {
                    // open https://github.com/IgorGreenIGM
                    window.open('https://github.com/IgorGreenIGM', '_blank').focus();
                  }}
                >
                  <FaGithub
                    style={{
                      width: isMobile ? '16px' : '20px',
                      height: isMobile ? '16px' : '20px',
                      color: 'var(--accent-color)',
                    }}
                  />
                </button>
              </div>
            </div>

            {/* Player Section */}
            <div
              style={{
                flex: 1,
                padding: '-100px',
                display: 'flex',
              }}
            >
              <PlayerWrapper />
            </div>
          </>
        )}
      </div>
      <div style={{marginTop:'80px'}}>
        <Footer />
      </div>
    </div>
  );
};

export default StatsPage;