import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MotorsportTypeCard from "./MotorsportTypeCard.jsx";
import MotorsportInformation from "./MotorsportInformation.jsx";
import ShinyText from "./ShinyText.jsx";
import Footer from "./Footer.jsx";
import logo from "/public/motoropedia-logo.png";
import "./styles/App.css";

function App() {
  const HomeLayout = () => (
    <>
      <header className="header">
        <div className="header-content">
            <img src={logo} alt="Motoropedia Logo" className="logo" />
        </div>
        <div className="welcome-text">
          <h1>Welcome to </h1>
          <ShinyText
            text='"Motoropedia"'
            disabled={false}
            speed={5}
            className="motoropedia-text"
          />
          <h1>, The encyclopedia for Motorsport Lovers!</h1>
        </div>
      </header>
      <div className="card-container">
        <MotorsportTypeCard
          title="Autocross"
          image="https://upload.wikimedia.org/wikipedia/commons/f/f0/Nov%C3%A1_Paka_%C5%A0tikov_Autokros.jpg"
          type="Autocross"
        />
        <MotorsportTypeCard
          title="Autotest"
          image="https://motorsportuk.s3.eu-west-2.amazonaws.com/wp-content/uploads/2022/04/20162356/Autotest-image.jpg"
          type="Autotest"
        />
        <MotorsportTypeCard
          title="Circuit Racing"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/BTCC_Brands06_PaddockHill.jpg/1200px-BTCC_Brands06_PaddockHill.jpg"
          type="CircuitRacing"
        />
        <MotorsportTypeCard
          title="Cross Country"
          image="https://www.goodthingsguy.com/wp-content/uploads/2017/07/A-high-speed-cross-country-motorsport-adventure-620x400.jpg"
          type="CrossCountry"
        />
        <MotorsportTypeCard
          title="Drag Racing"
          image="https://upload.wikimedia.org/wikipedia/commons/3/33/Maryland_Army_National_Guard_%283290671976%29.jpg"
          type="DragRacing"
        />
        <MotorsportTypeCard
          title="Drifing"
          image="https://upload.wikimedia.org/wikipedia/commons/9/9f/King_of_Europe_Round_3_Lydden_Hill_2014_%2814356011899%29.jpg"
          type="Drifting"
        />
        <MotorsportTypeCard
          title="Hill Climb"
          image="https://static.wixstatic.com/media/99e530_eac8ce28e07d4f14b18416f5e0928553~mv2.jpg/v1/fill/w_640,h_426,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/99e530_eac8ce28e07d4f14b18416f5e0928553~mv2.jpg"
          type="HillClimb"
        />
        <MotorsportTypeCard
          title="Karting"
          image="https://motorsportuk.s3.eu-west-2.amazonaws.com/wp-content/uploads/2023/04/18121941/Kai-Hunter_4015-1024x620.jpg"
          type="Karting"
        />
        <MotorsportTypeCard
          title="Rally Cross"
          image="https://upload.wikimedia.org/wikipedia/commons/7/7b/World_RX_-_2018_-_RD6_Sweden_%2829262747938%29.jpg"
          type="RallyCross"
        />
        <MotorsportTypeCard
          title="Rallying"
          image="https://upload.wikimedia.org/wikipedia/commons/6/6a/Petter_Solberg_-_2006_Cyprus_Rally.jpg"
          type="Rallying"
        />
        <MotorsportTypeCard
          title="Sprint"
          image="https://motorsportuk.s3.eu-west-2.amazonaws.com/wp-content/uploads/2019/08/24142359/Sprint-2048x1365.jpeg"
          type="Sprint"
        />
        <MotorsportTypeCard
          title="Trials"
          image="https://automedia.revsinstitute.org/wp-content/uploads/2023/05/wm-1924-arpajon-speed-trials-1.jpg"
          type="Trials"
        />
      </div>
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/:type" element={<MotorsportInformation />} />
      </Routes>
    </Router>
  );
}

export default App;
