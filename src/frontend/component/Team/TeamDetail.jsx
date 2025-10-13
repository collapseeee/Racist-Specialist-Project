import { Link, useParams } from "react-router-dom";
import "../../styles/Team/TeamDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import React, { useEffect, useState } from "react";

import racerPlaceholderImage from "../../public/racer-placeholder.jpg";
import carPlaceholderImage from "../../public/car-placeholder.png";
import teamLogoPlaceholderImage from "../../public/team-logo-placeholder.png";

function TeamDetail() {
  const { motorsportId } = useParams();
  const { teamId } = useParams();

  const [teamDetail, setTeamDetail] = useState([]);
  const [roster, setRoster] = useState([]);
  const [cars, setCars] = useState([]);
  const [tournaments, setTournaments] = useState([]);

  const handleGetData = async () => {
    try {
      const responseTeamDetail = await fetch(
        `http://localhost:3000/api/team:${teamId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultTeamDetail = await responseTeamDetail.json();
      console.log(resultTeamDetail);
      setTeamDetail(resultTeamDetail.data[0]);

      const responseRoster = await fetch(
        `http://localhost:3000/api/teamroster/:${teamId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultRoster = await responseRoster.json();
      console.log(resultRoster);
      setRoster(resultRoster.data);

      const responseCars = await fetch(
        `http://localhost:3000/api/car/team:${teamId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultCars = await responseCars.json();
      console.log(resultCars);
      setCars(resultCars.data);

      const responseTournaments = await fetch(
          `http://localhost:3000/api/tournament/team:${teamId}`,
          {
              method: "GET",
              headers: { "Content-Type": "application/json" },
          },
      );
      const resultTournaments = await responseTournaments.json();
      console.log(resultTournaments);
      setTournaments(resultTournaments.data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [teamId]);

  function getDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <NavBar />
      <div className="team-detail-header">
        <img src={teamLogoPlaceholderImage} className="team-detail-image" />
        <h1 className="team-detail-header-title">{teamDetail.team_name}</h1>
        <div className="team-detail-header-description">
          <div className="team-detail-header-description-left">
            <p className="tournament-detail-header-description-text">
              <strong>Sponsor:</strong>
            </p>
            <p className="tournament-detail-header-description-text">
              <strong>Country:</strong>
            </p>
            <p className="tournament-detail-header-description-text">
              <strong>Win Count:</strong>
            </p>
          </div>
          <div className="team-detail-header-description-right">
            <p className="tournament-detail-header-description-text">
              {teamDetail.sponsor}
            </p>
            <p className="tournament-detail-header-description-text">
              {teamDetail.country}
            </p>
            <p className="tournament-detail-header-description-text">
              {teamDetail.win_count}
            </p>
          </div>
        </div>
      </div>

      <div className="separator"></div>

      <div className="team-detail-roster">
        <h2 className="team-detail-roster-title">Team Roster</h2>
        <div className="racer-card-container">
          {roster.map((racer) => (
            <div key={racer.person_id} className="team-card">
              <div className="racer-card-info">
                <img
                  src={racerPlaceholderImage}
                  alt="Racer Image"
                  className="racer-card-image"
                />
                <Link
                  to={`/RacerList/${racer.person_id}`}
                  className="racer-card-link"
                >
                  <h3 className="racer-card-name">
                    {racer.first_name} {racer.last_name}
                  </h3>
                </Link>
                <div className="racer-card-description">
                  <div className="racer-card-description-left">
                    <p>
                      <strong>Status:</strong>
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>
                    </p>
                    <p>
                      <strong>Nationality:</strong>
                    </p>
                  </div>
                  <div className="racer-card-description-right">
                    <p>{racer.status}</p>
                    <p>{getDate(racer.date_of_birth)}</p>
                    <p>{racer.nationality}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="separator"></div>

      <div className="team-detail-roster">
        <h2 className="team-detail-roster-title">Car Roster</h2>
        <div className="racer-card-container">
          {cars.map((car) => (
            <div key={car.carmodel_id} className="team-card">
              <div className="racer-card-info">
                <img
                  src={carPlaceholderImage}
                  alt="Car Image"
                  className="racer-card-image"
                />
                <Link
                  to={`/Cars/${car.carmodel_id}`}
                  className="racer-card-link"
                >
                  <h3 className="racer-card-name">{car.car_type}</h3>
                </Link>
                  <div className="racer-card-description">
                      <div className="racer-card-description-left">
                          <p>
                              <strong>Engine:</strong>
                          </p>
                          <p>
                              <strong>Manufacturer:</strong>
                          </p>
                          <p>
                              <strong>Product Year:</strong>
                          </p>
                      </div>
                      <div className="racer-card-description-right">
                          <p>{car.engine}</p>
                          <p>{car.manufacturer}</p>
                          <p>{car.product_year}</p>
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>

        <div className="separator"></div>

        <div className="team-detail-participated">
            <h2 className="team-detail-participated-title">Tournament Participated</h2>
            <table className="team-table">
                <thead>
                <tr>
                <th>Tournament Name</th>
                <th>Date of Match</th>
                <th>Placement</th>
                <th>Avg. Laps Time</th>
                </tr>
                </thead>
                <tbody>
                {!tournaments || tournaments.length === 0 ? (
                    <tr>
                    <td colSpan="4" className="team-detail-no-tournament">
                        No tournament participated.
                    </td>
                    </tr>
                ) : (
                    tournaments.map((tournament) => (
                    <tr key={tournament.tournament_id}>
                        <td>
                            <Link
                                to={`/Tournaments/${tournament.tournament_id}`}
                                className="team-link"
                                >
                            {tournament.tournament_name}
                            </Link>
                        </td>
                        <td>{getDate(tournament.date_of_match)}</td>
                        <td>{tournament.placement}</td>
                        <td>{tournament.average_laps_time} seconds</td>
                    </tr>
                )))}
                </tbody>
            </table>
        </div>

      <Footer />
    </>
  );
}

export default TeamDetail;
