// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/NavBar/Navbar';
import MainPage from './pages/MainPage';
import StatsPage from './pages/StatsPage';
import Callback from './pages/Callback'
import ParticlesBackground from './components/ParticlesBackground/ParticlesBackground';
import './styles/global.css';

const App = () => {
  
  return (
    <>
      <Router>
          <ParticlesBackground />
          <Navbar />
          <MainPage />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path='/callback' element={<Callback />} />
          </Routes>
      </Router>
    </>
  );
};

export default App;