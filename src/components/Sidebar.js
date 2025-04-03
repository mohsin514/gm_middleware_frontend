import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { MdSync, MdOutlineHistory, MdOutlineSecurity } from "react-icons/md";
import {
  FaUserCog,
  FaUser,
  FaBell,
  FaLock,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp,
  FaCogs,
} from "react-icons/fa";
import "./Sidebar.css"; // ✅ Import Sidebar CSS

const Sidebar = ({ setSelectedComponent }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);

  // ✅ Animation States
  const [isSyncRotating, setIsSyncRotating] = useState(false);
  const [isLogsFlashing, setIsLogsFlashing] = useState(false);
  const [isUserShaking, setIsUserShaking] = useState(false);
  const [isNotificationsFlashing, setIsNotificationsFlashing] = useState(false);
  const [isPasswordShaking, setIsPasswordShaking] = useState(false);
  const [isSecurityFlashing, setIsSecurityFlashing] = useState(false);
  const [isAdminFlashing, setIsAdminFlashing] = useState(false);
  const [isNiceCxoneFlashing, setIsNiceCxoneFlashing] = useState(false); // ✅ Added State

  // ✅ Handle Navigation Clicks
  const handleNavClick = (section) => {
    setActiveTab(section);
    setSelectedComponent(section);

    if (section === "synchronization") {
      setIsSyncRotating(true);
      setTimeout(() => setIsSyncRotating(false), 2000);
    } else if (section === "syncLogs") {
      setIsLogsFlashing(true);
      setTimeout(() => setIsLogsFlashing(false), 2000);
    } else if (section === "profile") {
      setIsUserShaking(true);
      setTimeout(() => setIsUserShaking(false), 2000);
    } else if (section === "notifications") {
      setIsNotificationsFlashing(true);
      setTimeout(() => setIsNotificationsFlashing(false), 2000);
    } else if (section === "changePassword") {
      setIsPasswordShaking(true);
      setTimeout(() => setIsPasswordShaking(false), 2000);
    } else if (section === "securitySettings") {
      setIsSecurityFlashing(true);
      setTimeout(() => setIsSecurityFlashing(false), 2000);
    } else if (section === "admin") {
      setIsAdminFlashing(true);
      setTimeout(() => setIsAdminFlashing(false), 2000);
    } else if (section === "niceCxoneSetting") {
      // ✅ Animation Fix for NICE Cxone
      setIsNiceCxoneFlashing(true);
      setTimeout(() => setIsNiceCxoneFlashing(false), 2000);
    }
  };

  // ✅ Toggle User Settings Dropdown
  const toggleUserSettings = () => {
    setIsUserSettingsOpen(!isUserSettingsOpen);
  };

  return (
    <div className="d-flex flex-column bg-light vh-100 p-3 sidebar-container">
      {/* ✅ Sidebar Logo */}
      <div className="text-center mb-4 position-relative">
        <img
          src={`${process.env.PUBLIC_URL}/assets/dashbaord-logo.jpg`}
          className="img-fluid"
          alt="Logo"
        />
      </div>
      <br />
      <div className="text-center position-relative">
        <img
          src={`${process.env.PUBLIC_URL}/assets/consulting-group.png`}
          className="img-fluid consulting-logo"
          alt="Logo"
        />
      </div>

      {/* ✅ Navigation Links */}
      <Nav className="flex-column">
        {/* ✅ Synchronization */}
        <Nav.Link
          className={`text-dark ${
            activeTab === "synchronization" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("synchronization")}
        >
          <MdSync
            className={`me-2 ${isSyncRotating ? "rotate-animation" : ""}`}
          />
          Synchronization
        </Nav.Link>

        {/* ✅ Sync Logs */}
        <Nav.Link
          className={`text-dark ${
            activeTab === "syncLogs" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("syncLogs")}
        >
          <MdOutlineHistory
            className={`me-2 ${isLogsFlashing ? "flash-animation" : ""}`}
          />
          Synchronization Logs
        </Nav.Link>

        {/* ✅ User Settings (Expandable) */}
        <Nav.Link
          className="text-dark d-flex justify-content-start align-items-center"
          onClick={toggleUserSettings}
        >
          <FaUserCog
            className={`me-2 ${isUserShaking ? "shake-animation" : ""}`}
          />
          <span>User Settings</span>
          <span className="ms-auto">
            {isUserSettingsOpen ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </Nav.Link>

        {/* ✅ Nested User Settings Options */}
        {isUserSettingsOpen && (
          <div className="nested-menu">
            <Nav.Link
              className={`text-dark ${
                activeTab === "profile" ? "active-tab" : ""
              }`}
              onClick={() => handleNavClick("profile")}
            >
              <FaUser
                className={`me-2 ${isUserShaking ? "shake-animation" : ""}`}
              />{" "}
              Profile
            </Nav.Link>
            <Nav.Link
              className={`text-dark ${
                activeTab === "notifications" ? "active-tab" : ""
              }`}
              onClick={() => handleNavClick("notifications")}
            >
              <FaBell
                className={`me-2 ${
                  isNotificationsFlashing ? "flash-animation" : ""
                }`}
              />{" "}
              Notifications
            </Nav.Link>
            <Nav.Link
              className={`text-dark ${
                activeTab === "changePassword" ? "active-tab" : ""
              }`}
              onClick={() => handleNavClick("changePassword")}
            >
              <FaLock
                className={`me-2 ${isPasswordShaking ? "shake-animation" : ""}`}
              />{" "}
              Change Password
            </Nav.Link>
            <Nav.Link
              className={`text-dark ${
                activeTab === "securitySettings" ? "active-tab" : ""
              }`}
              onClick={() => handleNavClick("securitySettings")}
            >
              <MdOutlineSecurity
                className={`me-2 ${
                  isSecurityFlashing ? "flash-animation" : ""
                }`}
              />{" "}
              Security Settings
            </Nav.Link>
          </div>
        )}
        {/* ✅ NICE Cxone Setting Section (Fixed) */}
        <Nav.Link
          className={`text-dark ${
            activeTab === "niceCxoneSetting" ? "active-tab" : ""
          }`}
          onClick={() => handleNavClick("niceCxoneSetting")}
        >
          <FaCogs
            className={`me-2 ${isNiceCxoneFlashing ? "flash-animation" : ""}`}
          />
          NICE CXone Setting
        </Nav.Link>
        {/* ✅ Admin Section */}
        <Nav.Link
          className={`text-dark ${activeTab === "admin" ? "active-tab" : ""}`}
          onClick={() => handleNavClick("admin")}
        >
          <FaShieldAlt
            className={`me-2 ${isAdminFlashing ? "color-flash-animation" : ""}`}
          />
          Admin
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
