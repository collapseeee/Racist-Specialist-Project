/* RacerList.jsx */

import '../../styles/Team/TeamList.css'
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import Header from "../Universal/Header.jsx";
import racerPlaceholderImage from "../../../public/racer-placeholder.jpg";

function RacerList() {

  const [racers, setRacers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: "racer_name", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...racers].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    })
    setRacers(sorted);
  }

  const handleGetData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/racer`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await response.json();
      console.log(result);
      setRacers(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="team-header-container">
        <div className="team-header-content">
          <div className="team-header-banner">
            <Header
              title="Racers List"
              image={racerPlaceholderImage}
            />
          </div>
        </div>
      </div>

      <div className="team-content-container">
        <div className="team-content">
          <table className="team-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("first_name")}>
                  Racer Name {sortConfig.key === "first_name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("status")}>
                  Status {sortConfig.key === "status" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("nationality")}>
                  Nationality {sortConfig.key === "nationality" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("racer_license")}>
                  Racer License {sortConfig.key === "racer_license" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {racers.map((racer) => (
                <tr key={racer.person_id}>
                  <td>
                    <Link
                      to={`/RacerList/${racer.person_id}`}
                      className="team-link"
                    >
                      {racer.first_name} {racer.last_name}
                    </Link>
                  </td>
                  <td>{racer.status}</td>
                  <td>{racer.nationality}</td>
                  <td>{racer.racer_license}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </>
  )
}
export default RacerList;