/* Update.jsx */
import "../../styles/Admin/RemoveUpdate.css";
import {Link} from "react-router-dom";
import { useState } from "react";

import SearchBar from "../Universal/SearchBar.jsx";
import UpdateModal from "../Admin/UpdateModal.jsx";

function Update() {
    const [query, setQuery] = useState([]);

    const [tournamentResults, setTournamentResults] = useState([]);
    const [teamResults, setTeamResults] = useState([]);
    const [carResults, setCarResults] = useState([]);
    const [racerResults, setRacerResults] = useState([]);
    const [staffResults, setStaffResults] = useState([]);

    const [openSection, setOpenSection] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEndpoint, setSelectedEndpoint] = useState("");
    const [selectedData, setSelectedData] = useState({});
    const [selectedId, setSelectedId] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const openUpdateModal = (endpoint, data) => {
        console.log("Raw data received:", data);
        setSelectedEndpoint(endpoint);
        setSelectedData(data);
        setSelectedId(
            data.carmodel_id ||
            data.tournament_id ||
            data.team_id ||
            data.person_id
        );
        setIsModalOpen(true);
    };

    const handleSearch = async (searchTerm) => {
        setQuery(searchTerm);
        try {
            const response = await fetch(`http://localhost:3000/api/search:${searchTerm}`);
            const result = await response.json();
            console.log(result);
            setTournamentResults(result.data.tournaments);
            setTeamResults(result.data.teams);
            setRacerResults(result.data.racers);
            setCarResults(result.data.cars);
            setStaffResults(Array.isArray(result.data.staffs[0]) ? result.data.staffs[0] : result.data.staffs);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmitUpdate = async (endpoint, updateFields) => {
        if (!confirm(`Are you sure you want to update this?`)) return;

        const formattedData = {};

        Object.entries(updateFields).forEach(([key, value]) => {
            if (value !== "") {
                switch (key) {
                    // Person
                    case "first_name": formattedData.firstName = value; break;
                    case "last_name": formattedData.lastName = value; break;
                    case "date_of_birth": formattedData.dateOfBirth = value; break;
                    case "nationality": formattedData.nationality = value; break;
                    case "status": formattedData.status = value; break;

                    // Staff
                    case "referee_license": formattedData.refereeLicense = value; break;
                    case "years_experience": formattedData.yearsExperience = value; break;
                    case "language": formattedData.language = value; break;
                    case "staff_type": formattedData.staffType = value; break;

                    // Racer
                    case "racer_license": formattedData.license = value; break;

                    // Team
                    case "team_name": formattedData.name = value; break;
                    case "sponsor": formattedData.sponsor = value; break;
                    case "country": formattedData.country = value; break;
                    case "win_count": formattedData.totalWin = value; break;

                    //Tournament
                    case "tournament_name": formattedData.tournamentName = value; break;
                    case "date_of_match": formattedData.dateOfMatch = value; break;
                    case "circuit_street": formattedData.street = value; break;
                    case "circuit_city": formattedData.city = value; break;
                    case "circuit_state": formattedData.state = value; break;
                    case "circuit_zip": formattedData.zip = value; break;
                    case "average_viewer_count": formattedData.viewerCount = value; break;
                    case "motorsport_id": formattedData.motorId = value; break;
                    case "referee_id": formattedData.refereeId = value; break;
                    case "caster_id": formattedData.casterId = value; break;

                    // Car
                    case "car_type": formattedData.carType = value; break;
                    case "engine": formattedData.engine = value; break;
                    case "manufacturer": formattedData.manufacturer = value; break;
                    case "product_year": formattedData.productYear  = value; break;

                    default:
                        formattedData[key] = value;
                }
            }
        });

        const apiEndpoint = endpoint === "referee" || endpoint === "caster" ? "staff" : endpoint;
        console.log("Endpoint: " + apiEndpoint + ", ID: " + selectedId);

        try {
            const response = await fetch(`http://localhost:3000/api/${apiEndpoint}/${selectedId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formattedData),
            });

            if (response.ok) {
                alert("Successfully updated!");
                window.location.reload();
            } else {
                alert(`Failed: ${response.status}`);
            }
        } catch (err) {
            console.error(err);
            alert("Error occurred during update.");
        } finally {
            setIsModalOpen(false);
        }
    };


    const sections = [
        {
            key: "tournaments",
            title: "Tournament Result List",
            data: tournamentResults,
            content: (
                <table className="tournament-detail-ranking-table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Tournament Name</th>
                        <th>Date of Match</th>
                        <th>Circuit</th>
                        <th>Motorsport Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tournamentResults.map((t) => (
                        <tr key={`${t.tournament_id}`}>
                            <td className="remove-td">
                                <button className="update-button" onClick={() => openUpdateModal("tournament", t)}>
                                    Edit
                                </button>
                            </td>
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
                        <th></th>
                        <th>Team Name</th>
                        <th>Sponsor</th>
                        <th>Country</th>
                        <th>Motorsport Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teamResults.map((team) => (
                        <tr key={`${team.team_id}`}>
                            <td className="remove-td">
                                <button className="update-button" onClick={() => openUpdateModal("team", team)}>
                                    Edit
                                </button>
                            </td>
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
                            <td>{team.motorsport_type}</td>
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
                        <th></th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Racer License</th>
                    </tr>
                    </thead>
                    <tbody>
                    {racerResults.map((r) => (
                        <tr key={`${r.person_id}`}>
                            <td className="remove-td">
                                <button className="update-button" onClick={() => openUpdateModal("racer", r)}>
                                    Edit
                                </button>
                            </td>
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
                        <th></th>
                        <th>Car Type</th>
                        <th>Engine</th>
                        <th>Manufacturer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {carResults.map((c) => (
                        <tr key={`${c.carmodel_id}`}>
                            <td className="remove-td">
                                <button className="update-button" onClick={() => openUpdateModal("car", c)}>
                                    Edit
                                </button>
                            </td>
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
                        <th></th>
                        <th>Name</th>
                        <th>Staff Type</th>
                        <th>Year Experience</th>
                    </tr>
                    </thead>
                    <tbody>
                    {staffResults.map((s) => (
                        <tr key={s.person_id}>
                            <td className="remove-td">
                                <button className="update-button" onClick={() =>
                                    (openUpdateModal((s.staff_type.toLowerCase() === "referee") ? ("referee") : ("caster"), s))}>
                                    Edit
                                </button>
                            </td>
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

    function getDate(dateString) {
        if (!dateString) return "-";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <>
            <div className="removeupdate-header">
                <h1>Update Data</h1>
            </div>
            <div className="removeupdate-searchbar-container">
                <SearchBar mode="admin" onSearch={handleSearch}/>
            </div>
            <div className="admin-search-result-container">
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
            <UpdateModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                endpoint={selectedEndpoint}
                onSubmit={handleSubmitUpdate}
                currentData={selectedData}
            />
        </>
    );
}

export default Update;
