/* NavBar.jsx */
import "../../styles/Universal/NavBar.css";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import SearchBar from "./SearchBar.jsx";
import logo from "/public/motoropedia-logo.png";
import motorsportData from "../../data/motorsportData.js";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.substring(1);
  const pathParts = currentPath.split("/");
  const motorsportId = pathParts[0];

  const currentMotorsport = motorsportData[motorsportId];
  const isMotorsportPage = !!currentMotorsport;
  const isStaffPage = currentPath.startsWith("StaffList");
  const isStaffDetailPage = /^StaffList\/\d+/.test(currentPath); // Detects StaffDetail (e.g., /StaffList/5)
  const isSearchPage = currentPath.startsWith("SearchResult");

  const dropdownText = isStaffDetailPage
    ? "Person Detail"
    : isStaffPage
      ? "Person"
      : isSearchPage
        ? "Search Results"
        : isMotorsportPage
          ? currentMotorsport.title
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
              {isStaffDetailPage ? (
                <>
                  <Link to="/StaffList" className="dropdown-item">
                    Back to Staff List
                  </Link>
                  <Link to="/" className="dropdown-item">
                    Back to Home
                  </Link>
                </>
              ) : isStaffPage ? (
                <>
                  <a href="#referees" className="dropdown-item">
                    Referees
                  </a>
                  <a href="#casters" className="dropdown-item">
                    Casters
                  </a>
                </>
              ) : isSearchPage ? (
                <>
                  <a href="#tournaments" className="dropdown-item">
                    Tournament Results
                  </a>
                  <a href="#teams" className="dropdown-item">
                    Teams Results
                  </a>
                  <a href="#racers" className="dropdown-item">
                    Racers Results
                  </a>
                  <a href="#cars" className="dropdown-item">
                    Cars Results
                  </a>
                  <a href="#staffs" className="dropdown-item">
                    Staff Results
                  </a>
                </>
              ) : (
                Object.values(motorsportData).map((sport) => (
                  <Link
                    key={sport.id}
                    to={`/${sport.id}`}
                    className={`dropdown-item ${
                      motorsportId == sport.id ? "highlight-current" : ""
                    }`}
                  >
                    {sport.title}
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="navbar-right-side-content">
          <div className="search-bar-container">
            <SearchBar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
