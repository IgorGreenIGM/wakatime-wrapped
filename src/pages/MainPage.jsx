import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import StatsPreview from '../components/StatsPreview/StatsPreview';
import Footer from '../components/Footer/Footer';

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <HeroSection />
        <StatsPreview />
        <Footer />
      </div>
    </div>
  );
};

export default MainPage;