/* CarList.jsx */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import '../../styles/Car/CarList.css'

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import Header from "../Universal/Header.jsx";
import motorsportData from "../../data/motorsportData.js";


function CarList() {
  const { type } = useParams();
  const data = motorsportData[type];

  const [cars, setCars] = useState([]);
  const [sortConfig, setSortConfig] = useState({key: "car_type", direction: "desc"});

  useEffect(() => {
    const mockData = [
      {
        carmodel_id: 1,
        car_type: "F1",
        engine: "2.4L V8",
        manufacturer: "Red Bull",
        product_year: 2013,
        team_id: 1,
        team_name: "Team A",
      },
      {
        carmodel_id: 2,
        car_type: "F1",
        engine: "2,4L V8",
        manufacturer: "Ferrari",
        product_year: 2009,
        team_id: 2,
        team_name: "Team B",
      },
      {
        carmodel_id: 3,
        car_type: "WRC",
        engine: "1.6L I4 Turbo",
        manufacturer: "Volkswagen",
        product_year: 2003,
        team_id: 3,
        team_name: "Team C",
      },
      {
        carmodel_id: 4,
        car_type: "Indy Car",
        engine: "2.4L I9 Turbo",
        manufacturer: "BMW",
        product_year: 2017,
        team_id: 4,
        team_name: "Team D",
      },
    ];
    setCars(mockData);
  }, [type]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...cars].sort((a, b) => {
      if (a[key] < b[key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    })
    setCars(sorted);
  }

  return (
    <>
      <NavBar />

      <div className="car-header-container">
        <div className="car-header-content">
          <div className="car-header-banner">
            <Header
              title={data.title}
              image={data.image}
              category="Cars"
            />
          </div>
        </div>
      </div>

      <div className="car-content-container">
        <div className="car-content">
          <h2 className="car-table-title">{data.title} Cars List</h2>
          <table className="car-table">
            <thead>
            <tr>
              <th onClick={() => handleSort("car_type")}>
                Car Type {sortConfig.key === "car_type" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("engine")}>
                Engine {sortConfig.key === "engine" ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
              <th onClick={() => handleSort("country")}>
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
              <tr key={car.carmodel_id}>
                <td>
                  <Link
                    to={`/${type}/Cars/${car.carmodel_id}`}
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
export default CarList;