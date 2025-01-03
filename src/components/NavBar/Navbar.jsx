import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const toggleTheme = () => {
    const rootElement = document.documentElement;
    if (rootElement.classList.contains("light-theme")) {
      rootElement.classList.remove("light-theme");
    } else {
      rootElement.classList.add("light-theme");
    }
  };

  return (
    <nav className="navbar">
      <a className="navbar-left" style={{textDecoration:'none'}} href='/'>
        <img src="./wakatime-white-logo.svg" className="logo"/>
        <div style={{color:'white'}}>WakaTime Wrapped</div>
      </a>
      <div className="navbar-right">
        <a href="https://github.com/IgorGreenIGM/wakatime-wrapped" target="_blank" className="source-link">
          <FontAwesomeIcon icon={faGithub} /> Source
        </a>
      </div>
    </nav>
  );
};

export default Navbar;