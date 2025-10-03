import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles/App.css";

import Card from "./Card.jsx";
import MotorsportInformation from "./MotorsportInformation.jsx";
import ShinyText from "./ShinyText.jsx";
import Footer from "./Footer.jsx";
import TournamentInformation from "./TournamentInformation.jsx";
import TeamInformation from "./TeamInformation.jsx";
import CarInformation from "./CarInformation.jsx";

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
        <Route path="/:type/Tournaments" element={<TournamentInformation />} />
        <Route path="/:type/Teams" element={<TeamInformation />} />
        <Route path="/:type/Cars" element={<CarInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
