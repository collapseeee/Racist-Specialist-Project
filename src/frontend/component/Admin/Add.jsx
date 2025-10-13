/* Add.jsx */
import { useState } from "react";
import "../../styles/Admin/Add.css";

function Add() {
    const [selected, setSelected] = useState(null);
    const [formData, setFormData] = useState({});

    const handleSelect = (type) => {
        setSelected(type);
        setFormData({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const payload = { ...formData };

        let staffType = "";
        if (selected.toLowerCase() === "referee") staffType = "Referee";
        if (selected.toLowerCase() === "caster") staffType = "Caster";

        if (staffType) {
            payload.staffType = staffType;
        }

        const endpoint = (selected.toLowerCase() === "referee" || selected.toLowerCase() === "caster")
            ? "staff"
            : selected;

        console.log("Sending to:", endpoint, payload);

        try {
            const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("Successfully added!");
                window.location.reload();
            } else {
                const errMsg = await response.text();
                console.error("Server response:", errMsg);
                alert(`Failed to add: ${response.status}`);
            }
        } catch (err) {
            console.error("Add Error:", err);
            alert("Error occurred while adding.");
        }
    };


    const makeField = (label, key, type = "text", required = true) => (
        <input
            key={key}
            type={type}
            name={key}
            value={formData[key] || ""}
            onChange={handleChange}
            placeholder={label}
            required={required}
        />
    );

    const renderForm = () => {
        switch (selected) {
            case "tournament":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Tournament</h2>
                        {makeField("Tournament Name", "tournamentName")}
                        {makeField("Date of Match", "dateOfMatch", "date")}
                        {makeField("Circuit Street", "street")}
                        {makeField("Circuit City", "city")}
                        {makeField("Circuit State", "state")}
                        {makeField("Circuit Zip", "zip", "number")}
                        {makeField("Average Viewer", "viewerCount", "number")}
                        {makeField("Motorsport ID", "motorId", "number")}
                        {makeField("Referee ID", "refereeId", "number", )}
                        {makeField("Caster ID", "casterId", "number", )}
                        <button type="submit" className="submit-btn">Add Tournament</button>
                    </form>
                );

            case "racer":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Racer</h2>
                        {makeField("First Name", "firstName")}
                        {makeField("Last Name", "lastName")}
                        {makeField("Status", "status")}
                        {makeField("Date of Birth", "dateOfBirth", "date")}
                        {makeField("Nationality", "nationality")}
                        {makeField("Racer License", "racerLicense")}
                        <button type="submit" className="submit-btn">Add Racer</button>
                    </form>
                );

            case "team":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Team</h2>
                        {makeField("Team Name", "name")}
                        {makeField("Sponsor", "sponsor")}
                        {makeField("Country", "country")}
                        {makeField("Win Count", "totalWin", "number")}
                        <button type="submit" className="submit-btn">Add Team</button>
                    </form>
                );

            case "car":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Car</h2>
                        {makeField("Car Type", "carType")}
                        {makeField("Engine", "engine")}
                        {makeField("Manufacturer", "manufacturer")}
                        {makeField("Product Year (e.g. 2020)", "year", "number")}
                        {makeField("Team Owner ID", "team_id", "number", )}
                        <button type="submit" className="submit-btn">Add Car</button>
                    </form>
                );

            case "referee":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Referee</h2>
                        {makeField("First Name", "firstName")}
                        {makeField("Last Name", "lastName")}
                        {makeField("Date of Birth", "dateOfBirth", "date")}
                        {makeField("Nationality", "nationality")}
                        {makeField("Status", "status")}
                        {makeField("Years Experience", "yearsExperience", "number")}
                        {makeField("Referee License", "license")}
                        <input type="hidden" name="staffType" value="Referee" />
                        <button type="submit" className="submit-btn">Add Referee</button>
                    </form>
                );

            case "caster":
                return (
                    <form className="admin-form" onSubmit={handleAdd}>
                        <h2>Add Caster</h2>
                        {makeField("First Name", "firstName")}
                        {makeField("Last Name", "lastName")}
                        {makeField("Date of Birth", "dateOfBirth", "date")}
                        {makeField("Nationality", "nationality")}
                        {makeField("Status", "status")}
                        {makeField("Years Experience", "yearsExperience", "number")}
                        {makeField("Language", "language")}
                        <input type="hidden" name="staffType" value="Caster" />
                        <button type="submit" className="submit-btn">Add Caster</button>
                    </form>
                );

            default:
                return <p className="instruction-text">Select a category to start adding data.</p>;
        }
    };

    return (
        <div className="add-container">
            <div className="add-header">
                <h1>Add New Data</h1>
            </div>

            <div className="toggle-buttons">
                <button
                    className={`toggle-btn ${selected === "tournament" ? "active" : ""}`}
                    onClick={() => handleSelect("tournament")}
                >
                    Tournament
                </button>
                <button
                    className={`toggle-btn ${selected === "team" ? "active" : ""}`}
                    onClick={() => handleSelect("team")}
                >
                    Team
                </button>
                <button
                    className={`toggle-btn ${selected === "racer" ? "active" : ""}`}
                    onClick={() => handleSelect("racer")}
                >
                    Racer
                </button>
                <button
                    className={`toggle-btn ${selected === "car" ? "active" : ""}`}
                    onClick={() => handleSelect("car")}
                >
                    Car
                </button>
                <button
                    className={`toggle-btn ${selected === "referee" ? "active" : ""}`}
                    onClick={() => handleSelect("referee")}
                >
                    Referee
                </button>
                <button
                    className={`toggle-btn ${selected === "caster" ? "active" : ""}`}
                    onClick={() => handleSelect("caster")}
                >
                    Caster
                </button>
            </div>

            <div className="separator"></div>

            <div className="form-section">
                {renderForm()}
            </div>
        </div>
    );
}

export default Add;
