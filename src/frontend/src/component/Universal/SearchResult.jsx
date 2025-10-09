/* SearchResult.jsx */
import "../../styles/Universal/SearchResult.css";
import { Link, useLocation } from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import { useEffect, useState } from "react";

function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [tournamentResults, setTournamentResults] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [carResults, setCarResults] = useState([]);
  const [racerResults, setRacerResults] = useState([]);
  const [staffResults, setStaffResults] = useState([]);

  useEffect(() => {
    const handleGetData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/search:${query}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          },
        );
        const result = await response.json();
        console.log(result);
        setTournamentResults(result.data.tournaments);
        setTeamResults(result.data.teams);
        setRacerResults(result.data.racers);
        setCarResults(result.data.cars);
        setStaffResults(result.data.staff)
      } catch (err) {
        console.error(err);
      }
    };
    if (query) handleGetData();
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-result-container">
        <h1 className="search-result-header">Search Results for "{query}"</h1>
        <div className="search-result-content">
          <div className="result-content">
            <h2 className="result-table-title">Tournament Result List</h2>
            {tournamentResults.length === 0 ? (
              <p className="result-null-text">No tournament found.</p>
            ) : (
              <table className="tournament-detail-ranking-table">
                <thead>
                  <tr>
                    <th>Tournament Name</th>
                    <th>Date of Match</th>
                    <th>Circuit</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentResults.map((tournament) => (
                    <tr key={tournament.tournament_id}>
                      <td>
                        <Link
                          to={`/Tournaments/${tournament.id}`}
                          className="staff-link"
                        >
                          {tournament.tournament_name}
                        </Link>
                      </td>
                      <td>DoM</td>
                      <td>Circuit</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="separator"></div>

          <div className="result-content">
            <h2 className="result-table-title">Teams Result List</h2>
            {teamResults.length === 0 ? (
              <p className="result-null-text">No team found.</p>
            ) : (
              <table className="tournament-detail-ranking-table">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>Sponsor</th>
                    <th>Country</th>
                  </tr>
                </thead>
                <tbody>
                  {teamResults.map((team) => (
                    <tr key={team.team_id}>
                      <td>
                        <Link
                          to={`/Tournaments/${team.team_id}`}
                          className="staff-link"
                        >
                          {team.team_name}
                        </Link>
                      </td>
                      <td>Sponsor</td>
                      <td>Country</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="separator"></div>

          <div className="result-content">
            <h2 className="result-table-title">Racer Result List</h2>
            {racerResults.length === 0 ? (
              <p className="result-null-text">No racer found.</p>
            ) : (
              <table className="tournament-detail-ranking-table">
                <thead>
                  <tr>
                    <th>Team Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {racerResults.map((racer) => (
                    <tr key={racer.person_id}>
                      <td>
                        <Link
                          to={`/Teams/${racer.team_id}`}
                          className="staff-link"
                        >
                          {racer.team_name}
                        </Link>
                      </td>
                      <td>{racer.first_name}</td>
                      <td>{racer.last_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="separator"></div>

          <div className="result-content">
            <h2 className="result-table-title">Cars Result List</h2>
            {carResults.length === 0 ? (
              <p className="result-null-text">No car found.</p>
            ) : (
              <table className="tournament-detail-ranking-table">
                <thead>
                  <tr>
                    <th>Car Type</th>
                    <th>Engine</th>
                    <th>Manufacturer</th>
                  </tr>
                </thead>
                <tbody>
                  {carResults.map((car) => (
                    <tr key={car.carmodel_id}>
                      <td>
                        <Link
                          to={`/Cars/${car.carmodel_id}`}
                          className="staff-link"
                        >
                          {car.car_type}
                        </Link>
                      </td>
                      <td>{car.engine}</td>
                      <td>{car.manufacturer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="separator"></div>

          <div className="result-content">
            <h2 className="result-table-title">Staff Result List</h2>
            {carResults.length === 0 ? (
              <p className="result-null-text">No staff found.</p>
            ) : (
              <table className="tournament-detail-ranking-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Staff Type</th>
                    <th>Year Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {staffResults.map((staff) => (
                    <tr key={staff.person_id}>
                      <td>
                        <Link
                          to={`/Staff/${staff.person_id}`}
                          className="staff-link"
                        >
                          {staff.first_name} {staff.last_name}
                        </Link>
                      </td>
                      <td>{staff.staff_type}</td>
                      <td>{staff.year_experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SearchResult;
