/* LoginPage.jsx */
import "../../styles/Admin/LoginPage.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const normalizedUsername = username.trim().toLowerCase();

        if (normalizedUsername === "admin" && password === "953212") {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/Admin/Dashboard");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <div className="login-container">
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h1 className="login-title">Admin Login</h1>
            <form onSubmit={handleLogin} className="login-form">
                <label className="login-label">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    required
                />

                <label className="login-label">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                />

                {error && <p className="login-error">{error}</p>}

                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;