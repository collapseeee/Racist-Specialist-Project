import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TypeCard from "./TypeCard.jsx";
import Information from "./Information.jsx";
import logo from "/public/motoropedia-logo.png";
import "./App.css";

function App() {
  const HomeLayout = () => (
    <>
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Motoropedia Logo" className="logo" />
            <h1 className="title">Motoropedia</h1>
          </Link>
        </div>
      </header>
      <div className="card-container">
        <TypeCard
          title="Autocross"
          image="https://upload.wikimedia.org/wikipedia/commons/f/f0/Nov%C3%A1_Paka_%C5%A0tikov_Autokros.jpg"
          type="Autocross"
        />
        <TypeCard
          title="Autotest"
          image="https://motorsportuk.s3.eu-west-2.amazonaws.com/wp-content/uploads/2022/04/20162356/Autotest-image.jpg"
          type="Autotest"
        />
        <TypeCard
          title="Circuit Racing"
          image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/BTCC_Brands06_PaddockHill.jpg/1200px-BTCC_Brands06_PaddockHill.jpg"
          type="CircuitRacing"
        />
          <TypeCard
              title="Cross Country"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="CrossCountry"
          />
          <TypeCard
              title="Drag Racing"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="DragRacing"
          />
          <TypeCard
              title="Drifing"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="Drifting"
          />
          <TypeCard
              title="Hill Climb"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="HillClimb"
          />
          <TypeCard
              title="Karting"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="Karting"
          />
          <TypeCard
              title="Rally Cross"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="RallyCross"
          />
          <TypeCard
              title="Rallying"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="Rallying"
          />
          <TypeCard
              title="Sprint"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="Sprint"
          />
          <TypeCard
              title="Trials"
              image="https://i.imgur.com/l6wjKJ3.png"
              type="Trials"
          />
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/:type" element={<Information />} />
      </Routes>
    </Router>
  );
}

export default App;
