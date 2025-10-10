import "../styles/MotorsportInformation.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

import Footer from "./Universal/Footer.jsx";
import NavBar from "./Universal/NavBar.jsx";
import Card from "./Universal/Card.jsx";
import Header from "./Universal/Header.jsx";

import motorsportData from "../data/motorsportData.js";
import teamCardImage from "/public/team-card-image.png";
import tournamentCardImage from "/public/tournament-card-image.jpg";
import carCardImage from "/public/car-card-image.jpg";
import racerPlaceholderImage from "/public/racer-placeholder.jpg";

function MotorsportInformation() {
  const { motorsportId } = useParams();
  const data = motorsportData[motorsportId];

  const [calledData, setCalledData] = useState(null);

  const handleGetData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/motorsport:${data.title}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await response.json();
      console.log(result);
      setCalledData(result.data[0]);
      } catch (err) {
      console.error(err);
      }
    };

  useEffect(() => {
    handleGetData();
  }, [motorsportId]);

  if (!data || !calledData) {
    return (
      <>
        <NavBar />
        <h1>Downloading...</h1>
        <p>If this takes longer than 30 seconds, the database server may be down.</p>
        <Footer />
      </>
    );
  }

  const title = data.title;
  const tournamentsPath = `${motorsportId}/Tournaments`;
  const teamsPath = `${motorsportId}/Teams`;
  const carsPath = `${motorsportId}/Cars`;
  const racersPath = `${motorsportId}/Racers`;

  return (
    <>
      <NavBar />
      <div className="information-header-banner">
        <Header title={data.title} image={data.image} />
      </div>
      <div className="information-container">
        <div className="information-content">
          <div className="information-card-container">
            <div className="information-cards">
              <Card title="Tournaments" image={tournamentCardImage} id={tournamentsPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
            <div className="information-cards">
              <Card title="Teams" image={teamCardImage} id={teamsPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
            <div className="information-cards">
              <Card title="Cars" image={carCardImage} id={carsPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
            <div className="information-cards">
              <Card title="Racers" image={racerPlaceholderImage} id={racersPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
          </div>

          <div className="separator"></div>

          <div className="information-content-description">
            <h1 className="information-content-description-header">
              What is {title}?
            </h1>
            <div className="information-content-description-body">
              {data.description.map((line, index) =>
                index % 2 === 0 ? (
                  <p
                    key={index}
                    className="information-content-description-subbody"
                  >
                    {line}
                  </p>
                ) : (
                  <h2
                    key={index}
                    className="information-content-description-subheader"
                  >
                    {line}
                  </h2>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MotorsportInformation;
