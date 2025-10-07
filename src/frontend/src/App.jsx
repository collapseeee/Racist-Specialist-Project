import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";

import Card from "./Card.jsx";
import MotorsportInformation from "./MotorsportInformation.jsx";
import ShinyText from "./ShinyText.jsx";
import Footer from "./Footer.jsx";
import TournamentList from "./TournamentList.jsx";
import TeamList from "./TeamList.jsx";
import CarList from "./CarList.jsx";
import SearchBar from "./SearchBar.jsx";
import TournamentDetail from "./TournamentDetail.jsx";
import TeamDetail from "./TeamDetail.jsx";
import CarDetail from "./CarDetail.jsx";

import logo from "/public/motoropedia-logo.png";
import motorsportData from "./data/motorsportData.js";

function App() {
  const HomeLayout = () => (
    <>
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Motoropedia Logo" className="logo" />
        </div>
          <div className="welcome-text">
            <h1>Welcome to </h1>
            <ShinyText
              text='"Motoropedia"'
              disabled={false}
              speed={5}
              className="motoropedia-text"
            />
            <h1>, The encyclopedia for Motorsport Lovers!</h1>
          </div>
        <div className="search-bar-container">
          < SearchBar />
        </div>
      </header>

      <div className="card-container">
        {Object.values(motorsportData).map((motorsport) => (
          <Card
            key={motorsport.title}
            title={motorsport.title}
            image={motorsport.image}
            type={motorsport.urlName}
          />
        ))}
      </div>
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />

        <Route path="/:type" element={<MotorsportInformation />} />
        <Route path="/:type/Tournaments" element={<TournamentList />} />
        <Route path="/:type/Teams" element={<TeamList />} />
        <Route path="/:type/Cars" element={<CarList />} />

        <Route path="/:type/Tournaments/:tournamentId" element={<TournamentDetail />} />
        <Route path="/:type/Teams/:teamId" element={<TeamDetail />} />
        <Route path="/:type/Cars/:carId" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
