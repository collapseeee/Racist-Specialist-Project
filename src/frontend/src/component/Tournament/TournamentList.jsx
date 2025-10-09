/* TournamentList.jsx */
import "../../styles/Tournament/TournamentList.css";
import { useParams, Link } from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import Header from "../Universal/Header.jsx";
import motorsportData from "../../data/motorsportData.js";
import React, { useEffect, useState } from "react";

function TournamentList() {
  const { motorsportId } = useParams();
  const data = motorsportData[motorsportId];

  const [tournaments, setTournaments] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "tournament_name",
    direction: "asc",
  });

  const handleGetData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/tournament/motorsport:${motorsportId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await response.json();
      console.log(result);
      setTournaments(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [motorsportId]);

  const handleSort = (key) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction: newDirection });

    setTournaments((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return newDirection === "asc" ? -1 : 1;
        if (a[key] > b[key]) return newDirection === "asc" ? 1 : -1;
        return 0;
      }),
    );
  };

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
          <h2 className="tournament-table-title">
            {data.title} Tournaments List
          </h2>
          <table className="tournament-detail-ranking-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("tournament_name")}>
                  Tournament Name{" "}
                  {sortConfig.key === "tournament_name"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th onClick={() => handleSort("date_of_match")}>
                  Date of Match{" "}
                  {sortConfig.key === "date_of_match"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th onClick={() => handleSort("circuit_street")}>
                  Circuit{" "}
                  {sortConfig.key === "circuit_street"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th onClick={() => handleSort("circuit_city")}>
                  City{" "}
                  {sortConfig.key === "circuit_city"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
                <th onClick={() => handleSort("circuit_state")}>
                  State{" "}
                  {sortConfig.key === "circuit_state"
                    ? sortConfig.direction === "asc"
                      ? "▲"
                      : "▼"
                    : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournament) => (
                <tr key={tournament.tournament_id}>
                  <td>
                    <Link
                      to={`/${motorsportId}/Tournaments/${tournament.tournament_id}`}
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
