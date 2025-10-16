/* SearchResult.jsx */
import "../../styles/Universal/SearchResult.css";
import { Link, useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
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

  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

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
        setStaffResults(result.data.staffs[0]);
      } catch (err) {
        console.error(err);
      }
    };
    if (query) handleGetData();
  }, [query]);

  function getDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const sections = [
    {
      key: "tournaments",
      title: "Tournament Result List",
      data: tournamentResults,
      content: (
        <table className="tournament-detail-ranking-table">
          <thead>
            <tr>
              <th>Tournament Name</th>
              <th>Date of Match</th>
              <th>Circuit</th>
              <th>Motorsport Type</th>
            </tr>
          </thead>
          <tbody>
            {tournamentResults.map((t) => (
              <tr key={`${t.tournament_id}`}>
                <td>
                  <Link
                    to={`/Tournaments/${t.tournament_id}`}
                    className="staff-link"
                  >
                    {t.tournament_name}
                  </Link>
                </td>
                <td>{getDate(t.date_of_match)}</td>
                <td>
                  {t.circuit_street}, {t.circuit_city}, {t.circuit_state}
                </td>
                <td>{t.motorsport_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      key: "teams",
      title: "Teams Result List",
      data: teamResults,
      content: (
        <table className="tournament-detail-ranking-table">
          <thead>
            <tr>
              <th>Team Name</th>
              <th>Sponsor</th>
              <th>Country</th>
              <th>Win Count</th>
            </tr>
          </thead>
          <tbody>
            {teamResults.map((team) => (
              <tr key={`${team.team_id}`}>
                <td>
                  <Link
                    to={`/Teams/${team.team_id}`}
                    className="staff-link"
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
      ),
    },
    {
      key: "racers",
      title: "Racer Result List",
      data: racerResults,
      content: (
        <table className="tournament-detail-ranking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Racer License</th>
            </tr>
          </thead>
          <tbody>
            {racerResults.map((r) => (
              <tr key={`${r.person_id}`}>
                <td>
                  <Link
                    to={`/RacerList/${r.person_id}`}
                    className="staff-link"
                  >
                    {r.first_name} {r.last_name}
                  </Link>
                </td>
                <td>{r.status}</td>
                <td>{r.racer_license}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      key: "cars",
      title: "Cars Result List",
      data: carResults,
      content: (
        <table className="tournament-detail-ranking-table">
          <thead>
            <tr>
              <th>Car Type</th>
              <th>Engine</th>
              <th>Manufacturer</th>
              <th>Motorsport Type</th>
            </tr>
          </thead>
          <tbody>
            {carResults.map((c) => (
              <tr key={`${c.carmodel_id}`}>
                <td>
                  <Link
                    to={`/Cars/${c.carmodel_id}`}
                    className="staff-link"
                  >
                    {c.car_type}
                  </Link>
                </td>
                <td>{c.engine}</td>
                <td>{c.manufacturer}</td>
                <td>{c.motorsport_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
    {
      key: "staffs",
      title: "Staff Result List",
      data: staffResults,
      content: (
        <table className="tournament-detail-ranking-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Staff Type</th>
              <th>Year Experience</th>
            </tr>
          </thead>
          <tbody>
            {staffResults.map((s) => (
              <tr key={s.person_id}>
                <td>
                  <Link to={`/StaffList/${s.person_id}`} className="staff-link">
                    {s.first_name} {s.last_name}
                  </Link>
                </td>
                <td>{s.staff_type}</td>
                <td>{s.years_experience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    },
  ];

  return (
    <>
      <NavBar />
      <div className="search-result-container">
        <h1 className="search-result-header">Search Results for "{query}"</h1>

        {sections.map((section) => {
          const hasNoResult = section.data.length === 0;
          const isOpen = openSection === section.key;

          return (
            <div key={section.key} className="result-content" id={section.key}>
              <h2
                className={`result-table-title dropdown-toggle-title ${hasNoResult ? "disabled-title" : ""
                  }`}
                onClick={
                  !hasNoResult ? () => toggleSection(section.key) : undefined
                }
              >
                {section.title}
                {!hasNoResult && (
                  <span className="dropdown-arrow">{isOpen ? "▲" : "▼"}</span>
                )}
              </h2>

              <div
                className={`dropdown-section-body ${isOpen || hasNoResult ? "open" : "closed"
                  }`}
              >
                {hasNoResult ? (
                  <p className="result-null-text">
                    No {section.key} results found.
                  </p>
                ) : (
                  section.content
                )}
              </div>

              <div className="separator"></div>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}

export default SearchResult;
