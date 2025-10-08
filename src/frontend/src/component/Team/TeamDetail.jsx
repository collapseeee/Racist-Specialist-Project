import { useParams } from "react-router-dom";
import "../../styles/Team/TeamDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import React, { useEffect, useState } from "react";

import teamPlaceholderImage from "/public/team-placeholder.jpg";
import racerPlaceholderImage from "/public/racer-placeholder.jpg";
import carPlaceholderImage from "/public/car-placeholder.png";

function TeamDetail() {
  const { type } = useParams();

  const [roster, setRoster] = useState([]);
  const [cars, setCars] = useState([]);
  const mockTeamData = {
    team_name: "Team A",
    sponsor: "Sponsor A",
    country: "Cambodia",
    win_count: 1,
  };

  useEffect(() => {
    const mockData = [
      {
        person_id: 1,
        first_name: "Firstname1",
        last_name: "Lastname1",
        status: "retired",
        date_of_birth: "1992-12-09",
        nationality: "Thailand",
      },
      {
        person_id: 2,
        first_name: "Firstname2",
        last_name: "Lastname2",
        status: "active",
        date_of_birth: "1999-09-09",
        nationality: "Laos",
      },
      {
        person_id: 3,
        first_name: "Firstname3",
        last_name: "Lastname3",
        status: "retired",
        date_of_birth: "1909-09-09",
        nationality: "South Korea",
      },
    ];
    const carMockData = [
      {
        carmodel_id: 1,
        car_type: "F1",
        engine: "2.4L V8",
        manufacturer: "Red Bull",
        product_year: 2013,
      },
      {
        carmodel_id: 2,
        car_type: "F2",
        engine: "2.0L V4",
        manufacturer: "BMW",
        product_year: 2009,
      },
      {
        carmodel_id: 3,
        car_type: "F3",
        engine: "4.4L V10",
        manufacturer: "Ferrari",
        product_year: 2016,
      }
    ]
    setRoster(mockData);
    setCars(carMockData);
  }, [type]);
  return (
    <>
      <NavBar />
      <div className="team-detail-header">
        <img src={teamPlaceholderImage} className="team-detail-image" />
        <h1 className="team-detail-header-title">{mockTeamData.team_name}</h1>
          <div className="team-detail-header-description">
              <div className="team-detail-header-description-left">
                  <p className="tournament-detail-header-description-text">
                      <strong>Sponsor:</strong>
                  </p>
                  <p className="tournament-detail-header-description-text">
                      <strong>Country:</strong>
                  </p>
                  <p className="tournament-detail-header-description-text">
                      <strong>Win Count:</strong>
                  </p>
              </div>
              <div className="team-detail-header-description-right">
                  <p className="tournament-detail-header-description-text">
                      {mockTeamData.sponsor}
                  </p>
                  <p className="tournament-detail-header-description-text">
                      {mockTeamData.country}
                  </p>
                  <p className="tournament-detail-header-description-text">
                      {mockTeamData.win_count}
                  </p>
              </div>
          </div>
      </div>
      <div className="separator"></div>
      <div className="team-detail-roster">
        <h2 className="team-detail-roster-title">Team Roster</h2>
        <div className="racer-card-container">
          {roster.map((racer) => (
            <div key={racer.person_id} className="racer-card">
              <div className="racer-card-info">
                <img src={racerPlaceholderImage} alt="Racer Image" className="racer-card-image" />
                <h3 className="racer-card-name">
                  {racer.first_name} {racer.last_name}
                </h3>
                  <div className="racer-card-description">
                      <div className="racer-card-description-left">
                          <p>
                              <strong>Status:</strong>
                          </p>
                          <p>
                              <strong>Date of Birth:</strong>
                          </p>
                          <p>
                              <strong>Nationality:</strong>
                          </p>
                      </div>
                      <div className="racer-card-description-right">
                          <p>
                              {racer.status}
                          </p>
                          <p>
                              {racer.date_of_birth}
                          </p>
                          <p>
                              {racer.nationality}
                          </p>
                      </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="separator"></div>
      <div className="team-detail-roster">
        <h2 className="team-detail-roster-title">Car Roster</h2>
        <div className="racer-card-container">
          {cars.map((car) => (
            <div key={car.carmodel_id} className="racer-card">
              <div className="racer-card-info">
                <img src={carPlaceholderImage} alt="Car Image" className="racer-card-image" />
                <h3 className="racer-card-name">
                  {car.car_type}
                </h3>
                <p>
                  <strong>Engine:</strong> {car.engine}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {car.manufacturer}
                </p>
                <p>
                  <strong>Product Year:</strong> {car.product_year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TeamDetail;
