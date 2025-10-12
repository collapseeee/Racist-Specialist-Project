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
            case "delete":
                return <Delete />;
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
                        className={activeTab === "delete" ? "active" : ""}
                        onClick={() => setActiveTab("delete")}
                    >
                        Delete Data
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