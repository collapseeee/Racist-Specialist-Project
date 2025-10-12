import "../../styles/Tournament/TournamentDetail.css";
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import tournamentPlaceholderImage from "../../public/tournament-placeholder.png";

function TournamentDetail() {
  const { tournamentId } = useParams();

  const [tournamentDetail, setTournamentDetail] = useState([]);
  const [refereeDetail, setRefereeDetail] = useState([]);
  const [casterDetail, setCasterDetail] = useState([]);
  const [tournamentParticipating, setTournamentParticipating] = useState([]);

  const handleGetData = async () => {
    try {
      const responseTournamentDetail = await fetch(
        `http://localhost:3000/api/tournament:${tournamentId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultTournamentDetail = await responseTournamentDetail.json();
      const detail = resultTournamentDetail.data[0];
      console.log(detail);
      setTournamentDetail(detail);

      const responseTournamentParticipating = await fetch(
        `http://localhost:3000/api/participation:${tournamentId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultTournamentParticipating =
        await responseTournamentParticipating.json();
      console.log(resultTournamentParticipating);
      setTournamentParticipating(resultTournamentParticipating.data);

      const responseRefereeDetail = await fetch(
        `http://localhost:3000/api/staff:${detail.referee_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultRefereeDetail = await responseRefereeDetail.json();
      console.log(resultRefereeDetail);
      setRefereeDetail(resultRefereeDetail.data[0]);

      const responseCasterDetail = await fetch(
        `http://localhost:3000/api/staff:${detail.caster_id}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultCasterDetail = await responseCasterDetail.json();
      console.log(resultCasterDetail);
      setCasterDetail(resultCasterDetail.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [tournamentId]);

  function getTime(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  function getDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const getTotalTime = (start, finish) => {
    const diff = new Date(finish) - new Date(start);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <>
      <NavBar />
      <div className="tournament-container">
        <div className="tournament-detail-header">
          <img
            src={tournamentPlaceholderImage}
            alt="Tournament Image"
            className="tournament-detail-image"
          />
          <h1 className="tournament-detail-header-title">
            {tournamentDetail.tournament_name}
          </h1>

          <div className="tournament-detail-header-description">
            <div className="tournament-detail-header-description-left">
              <p className="tournament-detail-header-description-text">
                <strong>Type:</strong>
              </p>
              <p className="tournament-detail-header-description-text">
                <strong>Terrain:</strong>
              </p>
              <p className="tournament-detail-header-description-text">
                <strong>Circuit Address:</strong>
              </p>
              <p className="tournament-detail-header-description-text">
                <strong>Date of Match:</strong>
              </p>
              <p className="tournament-detail-header-description-text">
                <strong>Average Viewer Count:</strong>
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
                {tournamentDetail.motorsport_type}
              </p>
              <p className="tournament-detail-header-description-text">
                {tournamentDetail.terrain}
              </p>
              <p className="tournament-detail-header-description-text">
                {tournamentDetail.circuit_street},{" "}
                {tournamentDetail.circuit_city},{" "}
                {tournamentDetail.circuit_state}, {tournamentDetail.circuit_zip}
              </p>
              <p className="tournament-detail-header-description-text">
                {getDate(tournamentDetail.date_of_match)}
              </p>
              <p className="tournament-detail-header-description-text">
                {tournamentDetail.average_viewer_count}
              </p>
              <Link
                to={`/StaffList/${refereeDetail.person_id}`}
                className="team-link"
              >
                <p className="tournament-detail-header-description-text">
                  {refereeDetail.first_name} {refereeDetail.last_name}
                </p>
              </Link>
              <Link
                to={`/StaffList/${casterDetail.person_id}`}
                className="team-link"
              >
                <p className="tournament-detail-header-description-text">
                  {casterDetail.first_name} {casterDetail.last_name}
                </p>
              </Link>
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
                  {tournamentParticipating.map((tournament) => (
                    <tr key={`${tournament.id}-${tournament.placement}`}>
                      <td>{tournament.placement}</td>
                      <td>
                        <Link
                          to={`/Teams/${tournament.team_id}`}
                          className="team-link"
                        >
                          {tournament.team_name}
                        </Link>
                      </td>
                      <td>{tournament.average_laps_time}</td>
                      <td>{getTime(tournament.start_time)}</td>
                      <td>{getTime(tournament.finish_time)}</td>
                      <td>
                        {getTotalTime(
                          tournament.start_time,
                          tournament.finish_time,
                        )}
                      </td>
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
