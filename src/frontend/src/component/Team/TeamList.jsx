import '../../styles/Team/TeamList.css'

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import Header from "../Universal/Header.jsx";
import { Link, useParams } from "react-router-dom";
import motorsportData from "../../data/motorsportData.js";
import { useEffect, useState } from "react";

function TeamList() {
  const { type } = useParams();
  const data = motorsportData[type];

  const [teams, setTeams] = useState([]);
  const [sortConfig, setSortConfig] = useState({key: "team_name", direction: "desc"});

  useEffect(() => {
    const mockData = [
      {
        team_id: 1,
        team_name: "A Red Bull Racing",
        sponsor: "Infiniti",
        country: "Austria",
        win_count: 200,
      },
      {
        team_id: 2,
        team_name: "B Scuderia Ferrari",
        sponsor: "Shell",
        country: "Italy",
        win_count: 220,
      },
      {
        team_id: 3,
        team_name: "C Mercedes AMG Petronas F1 Team",
        sponsor: "Petronas",
        country: "Germany",
        win_count: 75,
      },
    ];
    setTeams(mockData);
  }, [type]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...teams].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    })
    setTeams(sorted);
  }

  return (
    <>
      <NavBar />
      <div className="team-header-container">
        <div className="team-header-content">
          <div className="team-header-banner">
            <Header
              title={data.title}
              image={data.image}
              category="Teams"
            />
          </div>
        </div>
      </div>

      <div className="team-content-container">
        <div className="team-content">
          <h2 className="team-table-title">{data.title} Teams List</h2>
          <table className="team-table">
            <thead>
            <tr>
              <th onClick={() => handleSort("team_name")}>
                Team Name {sortConfig.key === "team_name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("sponsor")}>
                Sponsor {sortConfig.key === "sponsor" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("country")}>
                Country {sortConfig.key === "country" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("win_count")}>
                Win Count {sortConfig.key === "win_count" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            </tr>
            </thead>
            <tbody>
            {teams.map((team) => (
              <tr key={team.tournament_id}>
                <td>
                  <Link
                    to={`/${type}/Teams/${team.team_id}`}
                    className="team-link"
                  >
                    {team.team_name}
                  </Link>
                </td>
                <td>{team.sponsor}</td>
                <td>{team.country}</td>
                <td>{team.win_count}</td>
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
export default TeamList;