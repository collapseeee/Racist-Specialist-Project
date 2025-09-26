// TypeCard.jsx
import { Link } from "react-router-dom";
import "./TypeCard.css";

function TypeCard({ title, image, type }) {
  return (
    <Link to={`/${type}`} className="type-card">
      <div
        className="type-card-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="type-card-title">{title}</div>
      </div>
    </Link>
  );
}

export default TypeCard;
