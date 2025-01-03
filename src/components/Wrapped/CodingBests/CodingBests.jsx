import React from 'react';
import { AbsoluteFill, Easing, Sequence, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { FaTrophy, FaCalendarAlt, FaClock, FaChartBar } from 'react-icons/fa';

const formatDateToYMD = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const parts = date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  }).split(' ');
  return `${parts[0]} ${parts[1]} ${parts[2]}`;
};

const StatCard = ({ icon: Icon, title, children, opacity, scale, marginTop = 0, fullWidth = false, width=500 }) => (
  <div 
    style={{ 
      opacity,
      transform: `scale(${scale})`,
      marginTop: `${marginTop}px`,
      padding: '20px',
    }}
  >
    <div
      className="relative overflow-hidden rounded-xl p-8"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        border: '1px solid var(--accent-color)',
        borderRadius: '10px',
        width: `${width}px`,
        padding: '20px',
        height: '200px',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Icon size={60} color="var(--accent-color)" />
        <span style={{ 
          marginLeft: '10px', 
          fontWeight: 'bold', 
          fontSize: '2.7rem'
        }}>{title}</span>
      </div>
      <div className="mt-4">
        {children}
      </div>
    </div>
  </div>
);

const CodingBests = ({ from, bestDay, bestWeek, bestMonth, yearlyAverage, milestones }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getStatOpacity = (index) => interpolate(
    frame, 
    [from + 40 + index * 20, from + 60 + index * 20], 
    [0, 1], 
    { extrapolateRight: 'clamp' }
  );
  
  const getStatScale = (index) => interpolate(
    frame, 
    [from + 40 + index * 20, from + 60 + index * 20], 
    [0.8, 1], 
    { easing: Easing.back(2), extrapolateRight: 'clamp' }
  );

  const titleOpacity = interpolate(frame, [from, from + 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [from, from + 30], [0.8, 1], { easing: Easing.elastic, extrapolateRight: 'clamp' });
  const trophyPulse = interpolate(frame, [from + 30, from + 50], [1, 1.2], { extrapolateRight: 'clamp' });

  return (
    <Sequence from={from} name="CodingBests" durationInFrames={390}>
      <AbsoluteFill 
        style={{
          backgroundColor: 'transparent',
          display: 'flex',
          padding: '60px',
          alignItems: 'center',
          height:'60',
          justifyContent:'center',
        }}
      >
        {/* Title Section */}
        <div 
          style={{ 
            opacity: titleOpacity, 
            transform: `scale(${titleScale})`,
            display: 'flex',
            alignItems: 'center',
            marginBottom: '70px',
            marginTop: '70px',
          }}
        >
          <div style={{ transform: `scale(${trophyPulse})`, marginRight:'20px' }}>
            <FaTrophy size={60} color="var(--accent-color)" />
          </div>
          <div className="text-6xl font-bold text-white ml-6" style={{fontSize:'50px', fontWeight:'bold'}}>
            Your Best Coding Achievements
          </div>
        </div>

        {/* Cards Container */}
        <div className="w-full flex flex-wrap justify-between gap-10" >
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Best Day */}
            <StatCard 
              icon={FaCalendarAlt}
              title="Best Day"
              opacity={getStatOpacity(0)}
              scale={getStatScale(0)}
            >
              <p style={{ color: 'var(--accent-color)', fontWeight:'bold', fontSize:'32px', marginTop:'10px' }}>
                {bestDay.date}
              </p>
              <p style={{ fontSize:'20px', marginTop:'10px' }} >
                {bestDay.hours} coded
              </p>
            </StatCard>

            {/* Best Week */}
            <StatCard 
              icon={FaChartBar}
              title="Best Week"
              opacity={getStatOpacity(1)}
              scale={getStatScale(1)}
            >
              <p style={{ color: 'var(--accent-color)', fontWeight:'bold', fontSize:'32px', marginTop:'10px' }}>
                <span style={{ color: 'var(--accent-color)'}}>{formatDateToYMD(bestWeek.startDate)}</span> 
                <span style={{ color: 'white', marginLeft:'10px'}}>to</span> 
                <span style={{ color: 'var(--accent-color)', marginLeft:'10px'}}>{formatDateToYMD(bestWeek.endDate)}</span>
              </p>
              <div style={{ fontSize:'20px', marginTop:'10px', display: 'flex', justifyContent:'space-between' }}>
                <span>{bestWeek.totalHours} coded</span>
                <span >Avg: {bestWeek.averagePerDay}/day</span>
              </div>
            </StatCard>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Best Month */}
            <StatCard 
              icon={FaClock}
              title="Best Month"
              opacity={getStatOpacity(2)}
              scale={getStatScale(2)}
            >
              <p style={{ color: 'var(--accent-color)', fontWeight:'bold', fontSize:'32px', marginTop:'10px' }}>
                {bestMonth.month}
              </p>
              <div style={{ fontSize:'20px', marginTop:'10px', display: 'flex', justifyContent:'space-between' }}>
                <p className="text-2xl text-gray-300">{bestMonth.totalHours} coded</p>
                <p className="text-2xl text-gray-300">Avg: {bestMonth.averagePerDay}/day</p>
              </div>
            </StatCard>

            {/* Yearly Average */}
            <StatCard 
              icon={FaChartBar}
              title="Yearly Average"
              opacity={getStatOpacity(3)}
              scale={getStatScale(3)}
            >
              <div style={{ fontSize:'20px', marginTop:'20px', display: 'flex', justifyContent:'space-between' }}>
                <div>
                  <p className="text-2xl text-gray-300">{yearlyAverage.hoursPerDay}/day</p>
                  <p style={{ marginTop:'20px' }}>{yearlyAverage.totalDaysCoded} days</p>
                </div>
                <div>
                  <p className="text-2xl text-gray-300">Consistency: {yearlyAverage.consistency}</p>
                  <p style={{ marginTop:'20px' }}>Total: {yearlyAverage.totalHours}</p>
                </div>
              </div>
            </StatCard>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
            {/* Milestones - Full Width */}
            <StatCard 
              icon={FaTrophy}
              title="Milestones"
              opacity={getStatOpacity(4)}
              scale={getStatScale(4)}
              fullWidth={true}
              width={800}
            >
              <div style={{ fontSize:'20px', marginTop:'50px', display: 'flex', justifyContent:'space-between' }}>
                {milestones.map((milestone, index) => (
                  <div key={index} style={{display:'flex', alignItems:'center' }}>
                    <div
                      style={{
                        backgroundColor: 'var(--accent-color)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                      }}
                    />&nbsp;&nbsp;
                    <p className="text-2xl text-gray-300">
                      {formatDate(milestone.milestone_date)}: {milestone.milestone_hours} hours
                    </p>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

export default CodingBests;