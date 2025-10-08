import { useParams, Link } from "react-router-dom";
import "../../styles/Tournament/TournamentDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import React, {useEffect, useState} from "react";
import tournamentPlaceholderImage from "/public/tournament-placeholder.png";

function TournamentDetail() {
    const { type } = useParams();

    const getTotalTime = (start, finish) => {
        const diff = new Date(finish) - new Date(start);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        return `${days}d ${hours}h ${minutes}m`;
    };


    const mockTournament = {
        tournament_id: 1,
        tournament_name: "Tournament",
        circuit_street: "Street",
        circuit_city: "City",
        circuit_state: "State",
        circuit_zip: "Zip",
        average_viewer: 90000,
        caster_id: 1,
        referee_id: 1,
    };

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
  }, []);

  return (
    <>
      <NavBar />
      <div className="tournament-container">
          <div className="tournament-detail-header">
              <img src={tournamentPlaceholderImage} alt="Tournament Image" className="tournament-detail-image" />
              <h1 className="tournament-detail-header-title">{mockTournament.tournament_name}</h1>
              <div className="tournament-detail-header-description">
                  <div className="tournament-detail-header-description-left">
                      <p className="tournament-detail-header-description-text">
                          <strong>Circuit Address:</strong>
                      </p>
                      <p className="tournament-detail-header-description-text">
                          <strong>Average Viewer:</strong>
                      </p>
                      <p className="tournament-detail-header-description-text">
                          <strong>Referee:</strong>
                      </p>
                      <p className="tournament-detail-header-description-text">
                          <strong>Caster:</strong>
                      </p>
                  </div>
                  <div className="tournament-detail-header-description-right">
                      <p className="tournament-detail-header-description-text">
                          {mockTournament.circuit_street}, {mockTournament.circuit_city}, {mockTournament.circuit_state}, {mockTournament.circuit_zip}
                      </p>
                      <p className="tournament-detail-header-description-text">
                          {mockTournament.average_viewer}
                      </p>
                      <p className="tournament-detail-header-description-text">
                          {mockTournament.referee_id}
                      </p>
                      <p className="tournament-detail-header-description-text">
                          {mockTournament.caster_id}
                      </p>
                  </div>
              </div>

              <div className="separator"></div>

              <div className="tournament-detail-ranking">
                <h2 className="tournament-detail-ranking-title">Ranking</h2>
                  <div className="tournament-detail-ranking-table-container">
                      <table className="tournament-detail-ranking-table">
                          <thead>
                          <tr>
                              <th>Placement</th>
                              <th>Team</th>
                              <th>Avg. Laps Time (sec)</th>
                              <th>Start Time</th>
                              <th>Finish Time</th>
                              <th>Total Time</th>
                          </tr>
                          </thead>
                          <tbody>
                          {tournament.map((tournament) => (
                              <tr key={tournament.id}>
                                  <td>{tournament.placement}</td>
                                  <td>
                                      <Link to={`/${type}/Teams/${tournament.team_id}`} className="team-link">
                                          {tournament.team_id}
                                      </Link>
                                  </td>
                                  <td>{tournament.average_laps_time}</td>
                                  <td>{tournament.start_time}</td>
                                  <td>{tournament.finish_time}</td>
                                  <td>{getTotalTime(tournament.start_time, tournament.finish_time)}</td>
                              </tr>
                          ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
      <Footer />
    </>
  );
}

export default TournamentDetail;
