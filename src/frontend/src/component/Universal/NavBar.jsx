import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "/public/motoropedia-logo.png";
import "../../styles/Universal/NavBar.css";
import SearchBar from "./SearchBar.jsx";

const motorsports = [
  "Autocross",
  "Autotest",
  "CircuitRacing",
  "CrossCountry",
  "DragRacing",
  "Drifting",
  "HillClimb",
  "Karting",
  "RallyCross",
  "Rallying",
  "Sprint",
  "Trials",
];

const formatName = (sportKey) => {
  return sportKey.replace(/([A-Z])/g, " $1").trim();
};

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.substring(1); // e.g. "Autocross/Tournaments"
  const currentMotorsport = motorsports.find((sport) =>
    currentPath.startsWith(sport)
  );

  const isMotorsportPage = !!currentMotorsport;
  const dropdownText = isMotorsportPage
    ? formatName(currentMotorsport)
    : "Motorsports";

  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-left-side-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            &#8592; Back
          </button>
          <Link to="/" className="logo-link">
            <img src={logo} alt="Motoropedia Logo" className="navbar-logo" />
            <span className="navbar-site-name">Motoropedia</span>
          </Link>
          <div className="motorsport-dropdown">
            <button className="dropdown-toggle">
              {dropdownText} <span className="arrow-icon">&#9662;</span>
            </button>
            <div className="dropdown-menu">
              {motorsports.map((sport) => (
                <Link
                  key={sport}
                  to={`/${sport}`}
                  className={`dropdown-item ${
                    currentPath.startsWith(sport) ? "highlight-current" : ""
                  }`}
                >
                  {formatName(sport)}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="navbar-right-side-content">
          <div className="search-bar-container">
            < SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
