import { useParams } from "react-router-dom";
import "./styles/TournamentDetail.css";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

function TournamentDetail() {
  return (
    <>
      <NavBar />
      <div>TournamentDetail</div>
      <Footer />
    </>
  );
}

export default TournamentDetail;
