import React, { useEffect, useState } from 'react';
import { FaMobileAlt, FaDesktop, FaTimes, FaFileImage, FaVideo, FaArrowLeft } from 'react-icons/fa';
import { buildVideo, getBuildVideoProgression } from '../../services/Api.jsx';

const DownloadModal = ({ isOpen, onClose, onDownloadCard, backendDatas }) => {
  const [downloadType, setDownloadType] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [renderId, setRenderId] = useState(null);

  // Handle progress polling
  let count = 0;
  useEffect(() => {
    let intervalId;

    if (renderId) {
      intervalId = setInterval(async () => {
        try {
          const data = await getBuildVideoProgression(renderId);
          
          if (data.state >= 100) {
            const anchor = document.createElement('a');
            anchor.href = data.url;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);

            setProgress(100);
            setIsDownloading(false);
            setRenderId(null);
            clearInterval(intervalId);
          } else {
            setProgress(parseFloat(data.state).toFixed(2));
          }
        } catch (err) {
          count += 1;
          if (count >= 10)
          {
            await new Promise(r => setTimeout(r, 1000));
            setIsDownloading(false);
            setRenderId(null);
            clearInterval(intervalId);
          }
        }
      }, 500);
    }

    // Cleanup function to clear interval when component unmounts or renderId changes
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [renderId]);

  const handleVideoDownload = async (orientation) => {
    setDownloadType(orientation);
    setIsDownloading(true);
    setProgress(0);

    try {
      const data = await buildVideo(orientation, backendDatas);
      setRenderId(data.render_id);
      console.log(data.render_id);
    } catch (err) {
      setIsDownloading(false);
      window.alert(err);
    }
  };

  const handleCardDownload = () => {
    onDownloadCard();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        // backdropFilter: 'blur(5px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#1a1a1a',
          borderRadius: '16px',
          width: '90%',
          maxWidth: '500px',
          border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(to right, rgba(var(--accent-color-rgb), 0.1), transparent)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {showVideoOptions && (
              <button
                onClick={() => setShowVideoOptions(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaArrowLeft size={20} />
              </button>
            )}
            <h2 style={{ 
              color: 'white', 
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}>
              {showVideoOptions ? 'Select Video Format' : 'Download Options'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {!showVideoOptions ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Resume Download Option */}
              <div style={{
                background: 'linear-gradient(45deg, rgba(var(--accent-color-rgb), 0.15), transparent)',
                borderRadius: '12px',
                padding: '2px',
              }}>
                <button
                  onClick={handleCardDownload}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    background: 'var(--accent-color)',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FaFileImage size={24} color="white" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>
                      Download Resume
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                      Get a static image of your resume
                    </div>
                  </div>
                </button>
              </div>

              {/* Video Download Option */}
              <div style={{
                background: 'linear-gradient(45deg, rgba(var(--accent-color-rgb), 0.15), transparent)',
                borderRadius: '12px',
                padding: '2px',
              }}>
                <button
                  onClick={() => setShowVideoOptions(true)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    background: 'var(--accent-color)',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FaVideo size={24} color="white" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>
                      Download Video
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                      Get an animated video of your resume
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Phone View Option */}
              <div style={{
                background: 'linear-gradient(45deg, rgba(var(--accent-color-rgb), 0.15), transparent)',
                borderRadius: '12px',
                padding: '2px',
              }}>
                <button
                  onClick={() => handleVideoDownload('vertical')}
                  disabled={isDownloading}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    background: 'var(--accent-color)',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FaMobileAlt size={24} color="white" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>
                      Phone View
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                      Vertical format for mobile devices
                    </div>
                  </div>
                </button>
              </div>

              {/* PC View Option */}
              <div style={{
                background: 'linear-gradient(45deg, rgba(var(--accent-color-rgb), 0.15), transparent)',
                borderRadius: '12px',
                padding: '2px',
              }}>
                <button
                  onClick={() => handleVideoDownload('horizontal')}
                  disabled={isDownloading}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    border: '1px solid rgba(var(--accent-color-rgb), 0.3)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    background: 'var(--accent-color)',
                    padding: '12px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <FaDesktop size={24} color="white" />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '1.1rem', marginBottom: '4px' }}>
                      PC View
                    </div>
                    <div style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
                      Horizontal format for desktop viewing
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isDownloading && (
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(var(--accent-color-rgb), 0.1)',
              borderRadius: '12px',
              marginTop: '20px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                color: 'white',
                fontSize: '0.9rem',
                marginBottom: '12px',
                alignItems: 'center'
              }}>
                <span>Rendering {downloadType === 'vertical' ? 'Phone' : 'PC'} Version...</span>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>{progress}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: 'var(--accent-color)',
                    transition: 'width 0.2s ease-out',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;