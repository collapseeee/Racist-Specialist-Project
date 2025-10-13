/* AllCarList.jsx */
import '../../styles/Team/TeamList.css'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import Header from "../Universal/Header.jsx";
import carPlaceholderImage from "../../public/car-placeholder.png";

function AllCarList() {

    const [cars, setCars] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: "car_type", direction: "desc" });

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }

        const sorted = [...cars].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortConfig({ key, direction });
        setCars(sorted);
    };

    const handleGetData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/car`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );
            const result = await response.json();
            console.log(result);
            setCars(result.data);
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

            <div className="car-header-container">
                <div className="car-header-content">
                    <div className="car-header-banner">
                        <Header
                            title="All Car List"
                            image={carPlaceholderImage}
                        />
                    </div>
                </div>
            </div>

            <div className="car-content-container">
                <div className="car-content">
                    <h2 className="car-table-title">All Cars List</h2>
                    <table className="car-table">
                        <thead>
                        <tr>
                            <th onClick={() => handleSort("car_type")}>
                                Car Type {sortConfig.key === "car_type" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => handleSort("engine")}>
                                Engine {sortConfig.key === "engine" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => handleSort("manufacturer")}>
                                Manufacturer {sortConfig.key === "country" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => handleSort("product_year")}>
                                Product Year {sortConfig.key === "product_year" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                            <th onClick={() => handleSort("team_name")}>
                                Team {sortConfig.key === "team_name" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {cars.map((car) => (
                            <tr key={`${car.carmodel_id}-${car.team_id}`}>
                                <td>
                                    <Link
                                        to={`/Cars/${car.carmodel_id}`}
                                        className="car-link"
                                    >
                                        {car.car_type} ({car.carmodel_id})
                                    </Link>
                                </td>
                                <td>{car.engine}</td>
                                <td>{car.manufacturer}</td>
                                <td>{car.product_year}</td>
                                <td>{car.team_name}</td>
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
export default AllCarList;