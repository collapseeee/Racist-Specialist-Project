import './styles/CarInformation.css'

import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { useParams } from "react-router-dom";
import motorsportData from "./data/motorsportData.js";
import Header from "./Header.jsx";

function CarInformation() {
  const { type } = useParams();
  const data = motorsportData[type];
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
        <div className="car-content"></div>
      </div>

      <Footer />
    </>
  )
}
export default CarInformation;