// Card.jsx
import { Link } from "react-router-dom";
import "../../styles/Universal/Card.css";

function Card({ title, image, type }) {
  return (
    <Link to={`/${type}`} className="type-card">
      <div
        className="type-card-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="image-overlay"></div>
        <div className="type-card-title">{title}</div>
      </div>
    </Link>
  );
}

export default Card;
