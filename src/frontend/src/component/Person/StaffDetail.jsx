/* StaffDetail.jsx */
import '../../styles/Staff/StaffDetail.css'
import {useParams} from "react-router-dom";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import racerPlaceholderImage from "/public/racer-placeholder.jpg";
import React, {useEffect, useState} from "react";

function StaffDetail() {
    const { personId } = useParams();

    const [staffData, setStaffData] = useState([]);

    const handleGetData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/staff:${personId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );
            const result = await response.json();
            console.log(result);
            setStaffData(result.data[0]);

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
                <h1 className="staff-detail-header-title">{staffData.staff_type}</h1>
                    <div className="staff-card">
                        <div className="staff-card-info">
                            <img src={racerPlaceholderImage} alt="Staff Image" className="staff-card-image" />
                            <h3 className="staff-card-name">
                                {staffData.first_name} {staffData.last_name}
                            </h3>
                            <div className="staff-card-description">
                                <div className="staff-card-description-left">
                                    <p>
                                        <strong>Date of Birth:</strong>
                                    </p>
                                    <p>
                                        <strong>Nationality:</strong>
                                    </p>
                                    <p>
                                        <strong>Status:</strong>
                                    </p>
                                    <p>
                                        <strong>Year Experience:</strong>
                                    </p>
                                    <p>
                                        <strong>Referee License:</strong>
                                    </p>
                                    <p>
                                        <strong>Language:</strong>
                                    </p>
                                </div>
                                <div className="staff-card-description-right">
                                    <p>
                                        {getDate(staffData.date_of_birth)}
                                    </p>
                                    <p>
                                        {staffData.nationality}
                                    </p>
                                    <p>
                                        {staffData.status}
                                    </p>
                                    <p>
                                        {staffData.years_experience}
                                    </p>
                                    <p>
                                      {staffData.staff_type === "Referee" ? staffData.referee_license : "-"}
                                    </p>
                                    <p>
                                        {staffData.staff_type === "Caster" ? staffData.language : "-"}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
            </div>

            <Footer />
        </>
    )
}

export default StaffDetail;