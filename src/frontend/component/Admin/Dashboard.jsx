import '../../styles/Admin/Dashboard.css'
import { useState } from "react";

import Add from "./Add.jsx"
import Remove from "./Remove.jsx"
import Update from "./Update.jsx"

function Dashboard() {
    const [activeTab, setActiveTab] = useState("add")

    const renderContent = () => {
        switch (activeTab) {
            case "add":
                return <Add />;
            case "remove":
                return <Remove />;
            case "update":
                return <Update />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h1>Admin Actions</h1>
                </div>

                <div className="dashboard-toggle-buttons">
                    <button
                        className={activeTab === "add" ? "active" : ""}
                        onClick={() => setActiveTab("add")}
                    >
                        Add Data
                    </button>
                    <button
                        className={activeTab === "remove" ? "active" : ""}
                        onClick={() => setActiveTab("remove")}
                    >
                        Remove Data
                    </button>
                    <button
                        className={activeTab === "update" ? "active" : ""}
                        onClick={() => setActiveTab("update")}
                    >
                        Update Data
                    </button>
                </div>

                <div className="dashboard-content">{renderContent()}</div>

            </div>
        </>
    );
};

export default Dashboard;