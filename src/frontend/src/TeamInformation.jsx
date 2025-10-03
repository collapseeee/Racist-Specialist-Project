import './styles/TeamInformation.css'

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import { useParams } from "react-router-dom";
import motorsportData from "./data/motorsportData.js";

function TeamInformation() {
  const { type } = useParams();
  const data = motorsportData[type];
  return (
    <>
      <NavBar />

      <div className="team-header-container">
        <div className="team-header-content">
          <div className="team-header-banner">
            <Header
              title={data.title}
              image={data.image}
              category="Teams"
            />
          </div>
        </div>
      </div>
      <div className="team-content-container">
        <div className="team-content"></div>
      </div>

      <Footer />
    </>
  )
}
export default TeamInformation;