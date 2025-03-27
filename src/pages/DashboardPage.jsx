import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Synchronization from "./Synchronization";
import SyncLogs from "./SyncLogs.js";
import Admin from "./Admin";
import Footer from "../components/Footer.js";
import Profile from "./ProfilePage.jsx";
import Notifications from "./NotificationsPage";
import ChangePassword from "./ChangePasswordPage";
import SecuritySettings from "./SecuritySettingsPage";
import NiceCxoneSettingForm from "./NiceCxoneSettingPage";

const Dashboard = () => {
  const loggedInUser = "John Doe";
  const [selectedComponent, setSelectedComponent] = useState("dashboard");

  return (
    <div className="d-flex flex-column min-vh-100">
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
            {selectedComponent === "profile" && <Profile />}
            {selectedComponent === "notifications" && <Notifications />}
            {selectedComponent === "changePassword" && <ChangePassword />}
            {selectedComponent === "securitySettings" && <SecuritySettings />}
            {selectedComponent === "admin" && <Admin />}
            {selectedComponent === "niceCxoneSetting" && (
              <NiceCxoneSettingForm />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
