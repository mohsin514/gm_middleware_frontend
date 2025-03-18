import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Synchronization from "./Synchronization";
import SyncLogs from "./SyncLogs.js";
import UserSettings from "./UserSettings";
import Admin from "./Admin";
import Footer from "../components/Footer.js";

const Dashboard = () => {
  const loggedInUser = "John Doe";
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* ✅ Main Content Wrapper (Fills Remaining Space) */}
      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* Sidebar (Fixed Full Height) */}
        <Sidebar setSelectedComponent={setSelectedComponent} />

        {/* Main Content (Scrollable) */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Header (Fixed) */}
          <Header username={loggedInUser} />

          {/* Content Area (Scrolls if Needed) */}
          <div className="container-fluid flex-grow-1 overflow-auto p-4">
            {selectedComponent === "dashboard" && (
              <>
                <h2 className="fw-bold">Welcome, {loggedInUser}!</h2>
                <p>This is your dashboard. Use the sidebar to navigate.</p>
              </>
            )}
            {selectedComponent === "synchronization" && <Synchronization />}
            {selectedComponent === "syncLogs" && <SyncLogs />}
            {selectedComponent === "userSettings" && <UserSettings />}
            {selectedComponent === "admin" && <Admin />}
          </div>
        </div>
      </div>

      {/* ✅ Footer (Always at Bottom) */}
      <Footer />
    </div>
  );
};

export default Dashboard;
