import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Card from "./component/Universal/Card.jsx";
import MotorsportInformation from "./component/MotorsportInformation.jsx";
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
import StaffList from "./component/Person/StaffList.jsx";
import ScrollToTop from "./component/Universal/ScrollToTop.jsx";
import StaffDetail from "./component/Person/StaffDetail.jsx";
import RacerList from "./component/Person/RacerList.jsx";
import RacerDetail from "./component/Person/RacerDetail.jsx";

import logo from "/public/motoropedia-logo.png";
import motorsportData from "./data/motorsportData.js";
import racerPlaceholderImage from "/public/racer-placeholder.jpg";
import staffPlaceholderImage from "/public/staff-placeholder.png";

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
          <SearchBar />
        </div>
      </header>

      <div className="card-container">
        {Object.values(motorsportData).map((motorsport) => (
          <Card
            key={motorsport.id}
            title={motorsport.title}
            image={motorsport.image}
            id={motorsport.id}
          />
        ))}
        <Card title="Staff List" image={staffPlaceholderImage} id="StaffList" />
        <Card title="Racer List" image={racerPlaceholderImage} id="RacerList" />
      </div>
      <Footer />
    </>
  );

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/SearchResult" element={<SearchResult />} />

        <Route path="/RacerList" element={<RacerList />} />
        <Route path="/RacerList/:personId" element={<RacerDetail />} />

        <Route path="/StaffList" element={<StaffList />} />
        <Route path="/StaffList/:personId" element={<StaffDetail />} />

        <Route path="/:motorsportId" element={<MotorsportInformation />} />
        <Route path="/:motorsportId/Tournaments" element={<TournamentList />} />
        <Route path="/:motorsportId/Teams" element={<TeamList />} />
        <Route path="/:motorsportId/Cars" element={<CarList />} />

        <Route path="/:motorsportId/Tournaments/:tournamentId" element={<TournamentDetail />} />
        <Route path="/:motorsportId/Teams/:teamId" element={<TeamDetail />} />
        <Route path="/:motorsportId/Cars/:carId" element={<CarDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
