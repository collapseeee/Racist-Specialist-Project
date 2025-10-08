import '../../styles/Universal/Header.css'
import React from "react";

function Header({title, image, category, description}) {
  return (
    <div className="header-container">
      <img src={image} alt={title} className="header-image" />
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <h2 className="header-category">{category}</h2>
        <p className="header-description">{description}</p>
      </div>
    </div>
  )
}

export default Header