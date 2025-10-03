import "./styles/TournamentInformation.css";
import { useParams } from "react-router-dom";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import motorsportData from "./data/motorsportData.js";

function TournamentInformation() {
  const { type } = useParams();
  const data = motorsportData[type];

  return (
    <>
      <NavBar />

      <div className="tournament-header-container">
        <div className="tournament-header-content">
          <div className="tournament-header-banner">
            <Header
              title={data.title}
              image={data.image}
              category="Tournaments"
            />
          </div>
        </div>
      </div>
      <div className="tournament-content-container">
        <div className="tournament-content"></div>
      </div>

      <Footer />
    </>
  );
}
export default TournamentInformation;
