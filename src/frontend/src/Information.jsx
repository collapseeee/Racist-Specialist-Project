// Information.jsx
import { data, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const motorsportData = {
  Autocross: {
    title: "Autocross",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Nov%C3%A1_Paka_%C5%A0tikov_Autokros.jpg",
    description: "Autocross is a timed competition where drivers navigate through a defined course one at a time."
  },
  Autotest: {
    title: "Autotest",
    image: "https://motorsportuk.s3.eu-west-2.amazonaws.com/wp-content/uploads/2022/04/20162356/Autotest-image.jpg",
    description: "Autotesting is a low-speed motorsport event focusing on precision and car control."
  },
  CircuitRacing: {
    title: "Circuit Racing",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c5/BTCC_Brands06_PaddockHill.jpg",
    description: "Circuit racing takes place on closed tracks where multiple drivers compete simultaneously."
  }
};



function Information() {


useEffect(() => {
  handleGetData();
}, [])

const handleGetData = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/motorsport:${type}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    console.log(data);
    
  } catch (err) {
    console.error(err)
  }
}


  const { type } = useParams();
  const [sportType, setSportType] = useState("Rally");
  const info = motorsportData[type];

  if (!info) return <div style={{ color: "white" }}>Motorsport not found</div>;

  return (
    <>
        <h1>{info.title}</h1>
    </>
  );
}

export default Information;
