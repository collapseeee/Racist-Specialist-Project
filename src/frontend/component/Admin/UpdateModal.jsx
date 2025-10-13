import React, { useState, useEffect } from "react";
import "../../styles/Admin/UpdateModal.css";

function UpdateModal({ isOpen, onClose, endpoint, onSubmit, currentData }) {
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (currentData && isOpen) {
            setFormData({ ...currentData });
        }
    }, [currentData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            [`${name}_modified`]: true,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const cleanedFormData = { ...formData };

        // Normalize all date fields to YYYY-MM-DD
        Object.keys(cleanedFormData).forEach((key) => {
            if (key.toLowerCase().includes("date") && cleanedFormData[key]) {
                const d = new Date(cleanedFormData[key]);
                // Keep only YYYY-MM-DD
                cleanedFormData[key] = d.toISOString().split("T")[0];
            }
        });

        onSubmit(endpoint, cleanedFormData);
    };


    const renderFields = () => {
        const makeField = (label, key, placeholder = "") => {

            let value = formData[key] || "";
            if (key.toLowerCase().includes("date") && value) {
                value = new Date(value).toISOString().split("T")[0];
            }

            return (
                <div className="form-field" key={key}>
                    <label>{label}</label>
                    <input
                        type={key.toLowerCase().includes("date") ? "date" : "text"}
                        name={key}
                        value={value}
                        placeholder={placeholder}
                        onChange={handleChange}
                    />
                </div>
            );
        };


        switch (endpoint) {
            case "racer":
                return (
                    <>
                        {makeField("First Name", "first_name")}
                        {makeField("Last Name", "last_name")}
                        {makeField("Status", "status", "Active / Retire")}
                        {makeField("Date of Birth", "date_of_birth", "YYYY-MM-DD")}
                        {makeField("Nationality", "nationality")}
                        {makeField("License", "racer_license")}
                    </>
                );

            case "team":
                return (
                    <>
                        {makeField("Team Name", "team_name")}
                        {makeField("Sponsor", "sponsor")}
                        {makeField("Country", "country")}
                        {makeField("Win Count", "win_count")}
                    </>
                );

            case "tournament":
                return (
                    <>
                        {makeField("Tournament Name", "tournament_name")}
                        {makeField("Date of Match", "date_of_match", "YYYY-MM-DD")}
                        {makeField("Circuit Street", "circuit_street")}
                        {makeField("Circuit City", "circuit_city")}
                        {makeField("Circuit State", "circuit_state")}
                        {makeField("Circuit Zip", "circuit_zip")}
                        {makeField("Average Viewer Count", "average_viewer_count")}
                        {makeField("Motorsport ID", "motorsport_id")}
                        {makeField("Caster ID", "caster_id")}
                        {makeField("Referee ID", "referee_id")}
                    </>
                );

            case "car":
                return (
                    <>
                        {makeField("Car Type", "car_type")}
                        {makeField("Engine", "engine")}
                        {makeField("Manufacturer", "manufacturer")}
                        {makeField("Product Year", "product_year")}
                    </>
                );

            case "referee":
                return (
                    <>
                        {makeField("First Name", "first_name")}
                        {makeField("Last Name", "last_name")}
                        {makeField("Status", "status")}
                        {makeField("Date of Birth", "date_of_birth")}
                        {makeField("Nationality", "nationality")}
                        {makeField("Years Experience", "years_experience")}
                        {makeField("Referee License", "referee_license")}
                    </>
                );

            case "caster":
                return (
                    <>
                        {makeField("First Name", "first_name")}
                        {makeField("Last Name", "last_name")}
                        {makeField("Status", "status")}
                        {makeField("Date of Birth", "date_of_birth")}
                        {makeField("Nationality", "nationality")}
                        {makeField("Years Experience", "years_experience")}
                        {makeField("Language", "language")}
                    </>
                );

            default:
                return <p>No editable fields for this type.</p>;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Edit {endpoint}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-fields">{renderFields()}</div>
                    <div className="modal-buttons">
                        <button type="submit" className="submit-btn">Save</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateModal;
