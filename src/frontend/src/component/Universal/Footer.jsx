import "../../styles/Universal/Footer.css";
import logo from "/public/motoropedia-logo.png";
import githublogo from "/public/github-logo.png";
import ShinyText from "./ShinyText.jsx";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-upper-content">
        <div className="footer-left-side-content">
            <img src={logo} alt="Motoropedia Logo" className="logo" />
          <ShinyText
            text="Motoropedia"
            disabled={false}
            speed={5}
            className="motoropedia-text"
          />
        </div>
        <div className="footer-right-side-content">
          <p>
            Your modern interface motorsport encyclopedia.
            <br />
            Search for tournaments, your favorite teams, your idol racers,
            <br />
            and everything you want to know about motorsport from here!
          </p>
        </div>
      </div>
      <hr />
      <div className="footer-lower-content">
        <h1 className="credit-header">Motoropedia Team: </h1>
        <p className="credit-text">
          672115002 Krittameth Tansuwan | 672115014 Nattikorn Sae-sue |
          672115050 Apitawan Chirakunasin
        </p>
        <a href="https://github.com/collapseeee/Racist-Specialist-Project">
          <img src={githublogo} alt="GitHub Logo" className="github-logo" />
        </a>
      </div>
    </div>
  );
}
export default Footer;
