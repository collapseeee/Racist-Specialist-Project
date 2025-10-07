/* TournamentList.jsx */
import "./styles/TournamentList.css";
import { useParams, Link } from "react-router-dom";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import motorsportData from "./data/motorsportData.js";
import { useEffect, useState } from "react";

function TournamentList() {
  const { type } = useParams();
  const data = motorsportData[type];

  const [tournaments, setTournaments] = useState([]);
  const [sortConfig, setSortConfig] = useState({key: "tournament_name", direction: "desc"});

  useEffect(() => {
    const mockData = [
      {
        tournament_id: 1,
        tournament_name: "Autocross Championship 2025",
        date_of_match: "2025-07-12",
        circuit_street: "Chiang Mai International Circuit",
        circuit_city: "Chiang Mai",
        circuit_state: "Thailand",
      },
      {
        tournament_id: 2,
        tournament_name: "National Dirt Rally Cup",
        date_of_match: "2025-09-01",
        circuit_street: "Buriram Speedway",
        circuit_city: "Bangkok",
        circuit_state: "Thailand",
      },
      {
        tournament_id: 3,
        tournament_name: "Thailand Motorsport Grand Prix",
        date_of_match: "2025-10-18",
        circuit_street: "Chang International Circuit",
        circuit_city: "Bangkok",
        circuit_state: "Thailand",
      },
    ];
    setTournaments(mockData);
  }, [type]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...tournaments].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    })
    setTournaments(sorted);
  }

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
        <div className="tournament-content">
          <h2 className="tournament-table-title">{data.title} Tournaments List</h2>
          <table className="tournament-table">
            <thead>
            <tr>
              <th onClick={() => handleSort("tournament_name")}>
                Tournament Name {sortConfig.key === "tournament_name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("date_of_match")}>
                Date of Match {sortConfig.key === "date_of_match" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("circuit_street")}>
                Circuit {sortConfig.key === "circuit_street" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("circuit_city")}>
                City {sortConfig.key === "circuit_city" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("circuit_state")}>
                State {sortConfig.key === "circuit_state" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
            </thead>
            <tbody>
            {tournaments.map((tournament) => (
              <tr key={tournament.tournament_id}>
                <td>
                  <Link
                    to={`/${type}/Tournaments/${tournament.tournament_id}`}
                    className="tournament-link"
                  >
                    {tournament.tournament_name}
                  </Link>
                </td>
                <td>{tournament.date_of_match}</td>
                <td>{tournament.circuit_street}</td>
                <td>{tournament.circuit_city}</td>
                <td>{tournament.circuit_state}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default TournamentList;
