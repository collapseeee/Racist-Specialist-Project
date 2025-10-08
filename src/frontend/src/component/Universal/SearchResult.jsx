/* SearchResult.jsx */
import "../../styles/Universal/SearchResult.css";
import { Link, useLocation } from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx"
import Footer from "../Universal/Footer.jsx"
import { useEffect, useState } from "react";

function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("q");

  const [tournamentResults, setTournamentResults] = useState([]);
  const [teamResults, setTeamResults] = useState([]);
  const [carResults, setCarResults] = useState([]);

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
      setTournamentResults(result.tournaments);
      setTeamResults(result.teams);
      setCarResults(result.cars);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    handleGetData();
  }, [query]);

  return (
    <>
      <NavBar />
      <div className="search-result-container">
        <h1 className="search-result-header">Search Results for "{query}"</h1>
        <div className="search-result-content">
          <div className="result-content">
            <h2 className="result-table-title">Tournament Result List</h2>
            <table className="tournament-table">
              <thead>
              <tr>
                <th>
                  Tournament Name
                </th>
                <th>
                  Date of Match
                </th>
                <th>
                  Circuit
                </th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div className="separator"></div>
          <div className="result-content">
            <h2 className="result-table-title">Teams Result List</h2>
            <table className="team-table">
              <thead>
              <tr>
                <th>
                  Team Name
                </th>
                <th>
                  Sponsor
                </th>
                <th>
                  Country
                </th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <div className="separator"></div>
          <div className="result-content">
            <h2 className="result-table-title">Cars Result List</h2>
            <table className="car-table">
              <thead>
              <tr>
                <th>
                  Car Type
                </th>
                <th>
                  Engine
                </th>
                <th>
                  Manufacturer
                </th>
              </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default SearchResult