import { useParams } from "react-router-dom";
import "./styles/TeamDetail.css";

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import React, {useEffect, useState} from "react";

import teamPlaceholderImage from "/public/team-placeholder.jpg";

function TeamDetail() {
    const { type } = useParams();

    const [roster, setRoster] = useState([]);
    const mockTeamData = {
        team_name: "Team A",
        sponsor: "Sponsor A",
        country: "Cambodia",
        win_count: 1,
    }

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
        setRoster(mockData);
    }, [type]);
  return (
    <>
      <NavBar />
        <div className="team-detail-header">
            <img src={teamPlaceholderImage} className="team-detail-image" />
            <h1 className="team-detail-header-title">{mockTeamData.team_name}</h1>
            <div className="team-detail-header-description">
                <h3 className="team-detail-header-description-header">Sponsor: </h3>
                <p className="team-detail-header-description-text">{mockTeamData.sponsor}</p>
                <h3 className="team-detail-header-description-header">Country: </h3>
                <p className="team-detail-header-description-text">{mockTeamData.country}</p>
                <h3 className="team-detail-header-description-header">Win Count: </h3>
                <p className="team-detail-header-description-text">{mockTeamData.win_count}</p>
            </div>
        </div>
        <div className="separator"></div>
        <div className="team-detail-roster">

        </div>
      <Footer />
    </>
  );
}

export default TeamDetail;
