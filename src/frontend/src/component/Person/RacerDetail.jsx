/* RacerDetail.jsx */
import '../../styles/Person/StaffDetail.css'
import '../../styles/Person/RacerDetail.css'
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import racerPlaceholderImage from "/public/racer-placeholder.jpg";

function StaffDetail() {
  const { personId } = useParams();

  const [racerData, setRacerData] = useState([]);
  const [teams, setTeams] = useState([])

  const handleGetData = async () => {
    try {
      const responseRacerData = await fetch(
        `http://localhost:3000/api/person:${personId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultRacerData = await responseRacerData.json();
      console.log(resultRacerData);
      setRacerData(resultRacerData.data[0]);

      const responseTeams = await fetch(
        `http://localhost:3000/api/team/person:${personId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resultTeams = await responseTeams.json();
      console.log(resultTeams);
      setTeams(resultTeams.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [personId]);

  function getDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return (
    <>
      <NavBar />

      <div className="staff-card-container">
        <h1 className="staff-detail-header-title">Racer</h1>
        <div className="staff-card">
          <div className="staff-card-info">
            <img src={racerPlaceholderImage} alt="Racer Image" className="staff-card-image" />
            <h3 className="staff-card-name">
              {racerData.first_name} {racerData.last_name}
            </h3>
            <div className="staff-card-description">
              <div className="staff-card-description-left">
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
              <div className="staff-card-description-right">
                <p>
                  {racerData.status}
                </p>
                <p>
                  {getDate(racerData.date_of_birth)}
                </p>
                <p>
                  {racerData.nationality}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="separator"></div>

      <div className="team-list-container">

      </div>

      <Footer />
    </>
  )
}

export default StaffDetail;