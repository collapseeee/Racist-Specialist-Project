import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '/public/motoropedia-logo.png';
import './styles/NavBar.css';

const motorsports = [
  "Autocross", "Autotest", "CircuitRacing", "CrossCountry",
  "DragRacing", "Drifting", "HillClimb", "Karting",
  "RallyCross", "Rallying", "Sprint", "Trials"
];

// Helper function to format the motorsport name for display
const formatName = (sportKey) => {
  return sportKey.replace(/([A-Z])/g, ' $1').trim();
};

function NavBar() {
  const location = useLocation();
  // Extract the current motorsport type from the URL path, e.g., '/CircuitRacing' -> 'CircuitRacing'
  const currentPath = location.pathname.substring(1);

  // Check if the current path is one of the motorsports
  const isMotorsportPage = motorsports.includes(currentPath);

  // Determine the text for the dropdown button
  const dropdownText = isMotorsportPage
    ? formatName(currentPath)
    : 'Motorsports';

  return (
    <div className="navbar">
      <div className="navbar-content">

        {/* Left Side Content: Logo, Site Name, and Dropdown */}
        <div className="navbar-left-side-content">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Motoropedia Logo" className="navbar-logo" />
            <span className="navbar-site-name">Motoropedia</span>
          </Link>

          {/* Motorsport Dropdown */}
          <div className="motorsport-dropdown">
            <button className="dropdown-toggle">
              {dropdownText} <span className="arrow-icon">&#9662;</span>
            </button>
            <div className="dropdown-menu">
              {motorsports.map((sport) => (
                <Link
                  key={sport}
                  to={`/${sport}`}
                  className={`dropdown-item ${currentPath === sport ? 'highlight-current' : ''}`}
                >
                  {formatName(sport)}
                </Link>
              ))}
            </div>
          </div>

          {/* This display is now redundant since the dropdown button shows the current sport,
              but keeping it for now if you prefer it: */}
          {/*
          {currentPath && motorsports.includes(currentPath) && (
             <span className="current-motorsport-display">
                <span className="separator">|</span>
                {formatName(currentPath)}
             </span>
          )}
          */}
        </div>

        {/* Right Side Content: Search Bar */}
        <div className="navbar-right-side-content">
          <div className="search-bar-container">
            <input type="text" placeholder="Search motorsports..." className="search-input" />
            <button className="search-button">
              <span role="img" aria-label="Search">&#128269;</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NavBar;