import { useParams } from "react-router-dom";
import "../../styles/Tournament/TournamentDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import {useEffect, useState} from "react";

function TournamentDetail() {
    const [tournament, setTournament] = useState([]);
  useEffect(() => {
    const mockData = [
      {
        team_id: 1,
        average_laps_time: 6000,
        start_time: "2012-10-03 14:00:00",
        finish_time: "2012-10-04 15:31:00",
        placement: 1,
      },
      {
        team_id: 2,
        average_laps_time: 6500,
        start_time: "2012-10-03 14:00:00",
        finish_time: "2012-10-05 16:21:00",
        placement: 1,
      },
      {
        team_id: 3,
        average_laps_time: 7000,
        start_time: "2012-10-03 14:00:00",
        finish_time: "2012-10-05 16:31:00",
        placement: 1,
      },
    ];
    setTournament(mockData);
  }, [type]);

  return (
    <>
      <NavBar />
      <div className="tournament-container">

      </div>
      <Footer />
    </>
  );
}

export default TournamentDetail;
