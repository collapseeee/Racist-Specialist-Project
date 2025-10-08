import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";

import Card from "./component/Universal/Card.jsx";
import MotorsportInformation from "./MotorsportInformation.jsx";
import ShinyText from "./component/Universal/ShinyText.jsx";
import Footer from "./component/Universal/Footer.jsx";
import TournamentList from "./component/Tournament/TournamentList.jsx";
import TeamList from "./component/Team/TeamList.jsx";
import CarList from "./component/Car/CarList.jsx";
import SearchBar from "./component/Universal/SearchBar.jsx";
import TournamentDetail from "./component/Tournament/TournamentDetail.jsx";
import TeamDetail from "./component/Team/TeamDetail.jsx";
import CarDetail from "./component/Car/CarDetail.jsx";
import SearchResult from "./component/Universal/SearchResult.jsx";

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
        <Route path="/SearchResult" element={<SearchResult />} />

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
