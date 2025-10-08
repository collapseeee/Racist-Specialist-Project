import '../../styles/Staff/StaffList.css'
import {useEffect, useState} from "react";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import {Link} from "react-router-dom";

function StaffList() {
    const [refereeList, setRefereeList] = useState([]);
    const [casterList, setCasterList] = useState([]);
    const [refereeSort, setRefereeSort] = useState({key: "first_name", direction: "asc"});
    const [casterSort, setCasterSort] = useState({key: "first_name", direction: "asc"});

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

    useEffect(() => {
        const mockRefereeData = [
            {
                person_id: 1,
                first_name: "Firstname1",
                last_name: "Lastname1",
                year_experience: 12,
                referee_license: 111111,
                nationality: "A",
            },
            {
                person_id: 2,
                first_name: "Firstname2",
                last_name: "Lastname2",
                year_experience: 11,
                referee_license: 222222,
                nationality: "C",
            },
            {
                person_id: 3,
                first_name: "Firstname3",
                last_name: "Lastname3",
                year_experience: 15,
                referee_license: 333333,
                nationality: "B",
            },
        ];
        const mockCasterData = [
            {
                person_id: 4,
                year_experience: 12,
                first_name: "Firstname1",
                last_name: "Lastname1",
                language: "Thai",
                nationality: "B",
            },
            {
                person_id: 5,
                first_name: "Firstname2",
                last_name: "Lastname2",
                year_experience: 10,
                language: "China",
                nationality: "C",
            },
            {
                person_id: 6,
                first_name: "Firstname1",
                last_name: "Lastname1",
                year_experience: 20,
                language: "Japan",
                nationality: "A",
            },

        ];
        setRefereeList(sortData(mockRefereeData, refereeSort.key, refereeSort.direction));
        setCasterList(sortData(mockCasterData, casterSort.key, casterSort.direction));
    });

    return (
        <>
            <NavBar />

            <div className="staff-content-container">
                <div className="staff-content">
                    <div className="staff-table-container">
                    <h2 className="staff-table-title">Referees List</h2>
                    <table className="tournament-detail-ranking-table">
                        <thead>
                        <tr>
                            <th onClick={() => handleRefereeSort("first_name")}>
                                Name {refereeSort.key === "first_name" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => handleRefereeSort("year_experience")}>
                                Year Experience {refereeSort.key === "year_experience" ? (refereeSort.direction === "asc" ? "▲" : "▼") : ""}
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
                                <td>{referee.year_experience}</td>
                                <td>{referee.referee_license}</td>
                                <td>{referee.nationality}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

                    <div className="separator"></div>

                    <div className="staff-table-container">
                        <h2 className="staff-table-title">Casters List</h2>
                        <table className="tournament-detail-ranking-table">
                            <thead>
                            <tr>
                                <th onClick={() => handleCasterSort("first_name")}>
                                    Name {casterSort.key === "first_name" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th onClick={() => handleCasterSort("year_experience")}>
                                    Year Experience {casterSort.key === "year_experience" ? (casterSort.direction === "asc" ? "▲" : "▼") : ""}
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
                                    <td>{caster.year_experience}</td>
                                    <td>{caster.language}</td>
                                    <td>{caster.nationality}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default StaffList;