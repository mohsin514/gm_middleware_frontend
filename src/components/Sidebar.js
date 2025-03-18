import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { MdSync, MdOutlineHistory } from "react-icons/md";
import { FaUserCog, FaShieldAlt } from "react-icons/fa";
import "./Sidebar.css"; // ✅ Import Sidebar CSS

const Sidebar = ({ setSelectedComponent }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [isSyncRotating, setIsSyncRotating] = useState(false);
  const [isLogsFlashing, setIsLogsFlashing] = useState(false);
  const [isUserShaking, setIsUserShaking] = useState(false);
  const [isAdminFlashing, setIsAdminFlashing] = useState(false);

  const handleNavClick = (section) => {
    setActiveTab(section);
    setSelectedComponent(section); // ✅ Switch content in Dashboard

    // ✅ Apply animations based on section
    if (section === "synchronization") {
      setIsSyncRotating(true);
      setTimeout(() => setIsSyncRotating(false), 2000);
    } else if (section === "syncLogs") {
      setIsLogsFlashing(true);
      setTimeout(() => setIsLogsFlashing(false), 2000);
    } else if (section === "userSettings") {
      setIsUserShaking(true);
      setTimeout(() => setIsUserShaking(false), 2000);
    } else if (section === "admin") {
      setIsAdminFlashing(true);
      setTimeout(() => setIsAdminFlashing(false), 2000);
    }
  };

  return (
    <div
      className="d-flex flex-column bg-light vh-100 p-3"
      style={{ width: "250px" }}
    >
      <div className="text-center mb-4">
        <img
          src="/assets/dashbaord-logo.jpg"
          className="img-fluid"
          alt="Logo"
        />
      </div>

      {/* ✅ Navigation Links */}
      <Nav className="flex-column">
        <Nav.Link
          className={`text-dark ${
            activeTab === "synchronization" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("synchronization")}
        >
          <MdSync
            className={`me-2 ${isSyncRotating ? "rotate-animation" : ""}`}
          />{" "}
          Synchronization
        </Nav.Link>

        <Nav.Link
          className={`text-dark ${
            activeTab === "syncLogs" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("syncLogs")}
        >
          <MdOutlineHistory
            className={`me-2 ${isLogsFlashing ? "flash-animation" : ""}`}
          />{" "}
          Synchronization Logs
        </Nav.Link>

        <Nav.Link
          className={`text-dark ${
            activeTab === "userSettings" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("userSettings")}
        >
          <FaUserCog
            className={`me-2 ${isUserShaking ? "shake-animation" : ""}`}
          />{" "}
          User Settings
        </Nav.Link>

        <Nav.Link
          className={`text-dark ${activeTab === "admin" ? "active-tab" : ""}`}
          onClick={() => handleNavClick("admin")}
        >
          <FaShieldAlt
            className={`me-2 ${isAdminFlashing ? "color-flash-animation" : ""}`}
          />{" "}
          Admin
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
