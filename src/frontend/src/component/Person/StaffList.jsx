import '../../styles/Person/StaffList.css'
import React, { useEffect, useState } from "react";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import { Link } from "react-router-dom";

function StaffList() {
    const [refereeList, setRefereeList] = useState([]);
    const [casterList, setCasterList] = useState([]);
    const [refereeSort, setRefereeSort] = useState({ key: "first_name", direction: "asc" });
    const [casterSort, setCasterSort] = useState({ key: "first_name", direction: "asc" });

    const [showReferees, setShowReferees] = useState(true);
    const [showCasters, setShowCasters] = useState([false]);

    const sortData = (data, key, direction) => {
        return [...data].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });
    };

    const handleRefereeSort = (key) => {
        const direction =
            refereeSort.key === key && refereeSort.direction === "asc"
                ? "desc"
                : "asc";
        setRefereeSort({ key, direction });

        setRefereeList((prevList) => sortData(prevList, key, direction));
    };

    const handleCasterSort = (key) => {
        const direction =
            casterSort.key === key && casterSort.direction === "asc"
                ? "desc"
                : "asc";
        setCasterSort({ key, direction });

        setCasterList((prevList) => sortData(prevList, key, direction));
    };

    const handleGetData = async () => {
        try {
            const responseReferee = await fetch(
                `http://localhost:3000/api/staff/referee`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );
            const resultReferee = await responseReferee.json();

            const responseCaster = await fetch(
                `http://localhost:3000/api/staff/caster`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );
            const resultCaster = await responseCaster.json();

            console.log(resultCaster);
            console.log(resultReferee);

            setRefereeList(resultReferee.data);
            setCasterList(resultCaster.data);
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

            <div className="staff-content-container">
                <div className="staff-content">

                    <div className="staff-dropdown-group">
                        <div className="staff-dropdown-header" onClick={() => setShowReferees(!showReferees)}>
                            <h2 id="referees" className="staff-table-title">Referees List</h2>
                            <span className="dropdown-arrow">{showReferees ? "▲" : "▼"}</span>
                        </div>
                        {showReferees && (
                            <div className="staff-table-container">
                                <table className="tournament-detail-ranking-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleRefereeSort("first_name")}>
                                                Name {refereeSort.key === "first_name" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleRefereeSort("years_experience")}>
                                                Year Experience {refereeSort.key === "years_experience" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleRefereeSort("referee_license")}>
                                                Referee License {refereeSort.key === "referee_license" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleRefereeSort("nationality")}>
                                                Nationality {refereeSort.key === "nationality" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {refereeList.map((referee) => (
                                            <tr key={referee.person_id}>
                                                <td>
                                                    <Link
                                                        to={`/StaffList/${referee.person_id}`}
                                                        className="staff-link"
                                                    >
                                                        {referee.first_name} {referee.last_name}
                                                    </Link>
                                                </td>
                                                <td>{referee.years_experience}</td>
                                                <td>{referee.referee_license}</td>
                                                <td>{referee.nationality}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="separator"></div>

                    <div className="staff-dropdown-group">
                        <div className="staff-dropdown-header" onClick={() => setShowCasters(!showCasters)}>
                            <h2 className="staff-table-title">Casters List</h2>
                            <span className="dropdown-arrow">{showCasters ? "▲" : "▼"}</span>
                        </div>

                        {showCasters && (
                            <div className="staff-table-container">
                                <h2 id="casters" className="staff-table-title">Casters List</h2>
                                <table className="tournament-detail-ranking-table">
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleCasterSort("first_name")}>
                                                Name {casterSort.key === "first_name" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleCasterSort("years_experience")}>
                                                Year Experience {casterSort.key === "years_experience" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleCasterSort("language")}>
                                                Language {casterSort.key === "language" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                            <th onClick={() => handleCasterSort("nationality")}>
                                                Nationality {casterSort.key === "nationality" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {casterList.map((caster) => (
                                            <tr key={caster.person_id}>
                                                <td>
                                                    <Link
                                                        to={`/StaffList/${caster.person_id}`}
                                                        className="staff-link"
                                                    >
                                                        {caster.first_name} {caster.last_name}
                                                    </Link>
                                                </td>
                                                <td>{caster.years_experience}</td>
                                                <td>{caster.language}</td>
                                                <td>{caster.nationality}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default StaffList;