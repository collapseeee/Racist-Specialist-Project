import { useParams, Link } from "react-router-dom";
import "../../styles/Car/CarDetail.css";

import NavBar from "../Universal/NavBar.jsx";
import Footer from "../Universal/Footer.jsx";
import carPlaceholderImage from "../../public/car-placeholder.png";
import { useEffect, useState } from "react";

function CarDetail() {
    const { motorsportId } = useParams();
    const { carId } = useParams();

    const [carDetail, setCarDetail] = useState([]);

    const handleGetData = async () => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/car:${carId}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                },
            );
            const result = await response.json();
            console.log(result);
            setCarDetail(result.data[0]);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [carId]);

    return (
        <>
            <NavBar />

            <div className="car-detail-header">
                <img
                    src={carPlaceholderImage}
                    alt="Car Image"
                    className="car-detail-image"
                />
                <h1 className="car-detail-header-title">{carDetail.car_type}</h1>
                <div className="car-detail-header-description">
                    <div className="car-detail-header-description-left">
                        <p className="car-detail-header-description-text">
                            <strong>Engine:</strong>
                        </p>
                        <p className="car-detail-header-description-text">
                            <strong>Manufacturer:</strong>
                        </p>
                        <p className="car-detail-header-description-text">
                            <strong>Product Year:</strong>
                        </p>
                        <p className="car-detail-header-description-text">
                            <strong>Owner:</strong>
                        </p>
                    </div>
                    <div className="car-detail-header-description-right">
                        <p className="car-detail-header-description-text">
                            {carDetail.engine}
                        </p>
                        <p className="car-detail-header-description-text">
                            {carDetail.manufacturer}
                        </p>
                        <p className="car-detail-header-description-text">
                            {carDetail.product_year}
                        </p>
                        <p className="car-detail-header-description-text">
                            <Link
                                to={`/${motorsportId}/Teams/${carDetail.team_id}`}
                                className="car-detail-team-link"
                            >
                                {carDetail.team_name}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default CarDetail;
