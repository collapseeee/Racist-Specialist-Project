// MotorsportInformation.jsx
import { data, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../styles/MotorsportInformation.css";
import Footer from "./Universal/Footer.jsx";
import NavBar from "./Universal/NavBar.jsx";
import Card from "./Universal/Card.jsx";
import motorsportData from "../data/motorsportData.js";
import teamCardImage from "/public/team-card-image.png";
import tournamentCardImage from "/public/tournament-card-image.jpg";
import carCardImage from "/public/car-card-image.jpg";
import Header from "./Universal/Header.jsx";

function MotorsportInformation() {
  const { type } = useParams();
  const data = motorsportData[type];

  const [calledData, setCalledData] = useState(null);

  // Path:
  const tournamentsPath = `${type}/Tournaments`;
  const teamsPath = `${type}/Teams`;
  const carsPath = `${type}/Cars`;
  const title = `${motorsportData[type].title}`;

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
  }, [type]);

  if (!data || !calledData)
    return (
      <>
        <NavBar />
        <h1>Downloading......</h1>
        <p>If this took longer than 30 seconds that mean database server is currently down.</p>
        <Footer />
      </>
    );

  return (
    <>
      <NavBar />
      <div className="information-header-banner">
      {calledData && (
        <Header
          title={data.title}
          image={data.image}
          description={`(Motorsport ID: ${calledData.motorsport_id})`}
        />
      )}
      </div>
      <div className="information-container">
        <div className="information-content">
          <div className="information-card-container">
            <div className="information-cards">
              <Card
                title="Tournaments"
                image={tournamentCardImage}
                type={tournamentsPath}
              />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
            <div className="information-cards">
              <Card title="Teams" image={teamCardImage} type={teamsPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
            <div className="information-cards">
              <Card title="Cars" image={carCardImage} type={carsPath} />
              <div className="information-cards-overlay-wrapper">
                <div className="information-cards-overlay-text">{title}</div>
              </div>
            </div>
          </div>
          <div className="separator"></div>
          <div className="information-content-description">
          <h1 className="information-content-description-header">
            What is {motorsportData[type].title}?
          </h1>
            <div className="information-content-description-body">
                {data.description.map((line, index) => {
                  if (index % 2 === 0) {
                    return <p key={index} className="information-content-description-subbody">{line}</p>;
                  } else {
                      return <h2 key={index} className="information-content-description-subheader">{line}</h2>
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MotorsportInformation;
