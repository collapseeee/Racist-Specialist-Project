import { useParams } from "react-router-dom";
import "./styles/TournamentDetail.css";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import {useEffect, useState} from "react";

function TournamentDetail() {
    const [tournament, setTeams] = useState([]);
    useEffect(() => {
        const mockData = {

        }
    })

  return (
    <>
      <NavBar />
      <div>TournamentDetail</div>
      <Footer />
    </>
  );
}

export default TournamentDetail;
