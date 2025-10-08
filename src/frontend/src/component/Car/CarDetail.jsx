import { useParams, Link } from "react-router-dom";
import "../../styles/Car/CarDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import carPlaceholderImage from "/public/car-placeholder.png";
import React, { useEffect, useState } from "react";

function CarDetail() {
  const { type } = useParams();

  const mockData = {
    carmodel_id: 1,
    car_type: "F1",
    engine: "2.4L V8",
    manufacturer: "Red Bull",
    product_year: 2013,
    team_id: 1,
    team_name: "Team A",
  };

  return (
    <>
      <NavBar />

      <div className="car-detail-header">
        <img
          src={carPlaceholderImage}
          alt="Car Image"
          className="car-detail-image"
        />
        <h1 className="car-detail-header-title">{mockData.car_type}</h1>
        <div className="car-detail-header-description">
          <p className="car-detail-header-description-text">
            <strong>Engine:</strong> {mockData.engine}
          </p>
          <p className="car-detail-header-description-text">
            <strong>Manufacturer:</strong> {mockData.manufacturer}
          </p>
          <p className="car-detail-header-description-text">
            <strong>Product Year:</strong> {mockData.product_year}
          </p>
          <p className="car-detail-header-description-text">
            <strong>Team Name:</strong>{" "}
            <Link
              to={`/${type}/Teams/${mockData.team_id}`}
              className="car-detail-team-link"
            >
              {mockData.team_name}
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CarDetail;
