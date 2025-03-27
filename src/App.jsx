import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/ProfilePage";
import NotificationsPage from "./pages/NotificationsPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import SecuritySettingsPage from "./pages/SecuritySettingsPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import AddUsersPage from "./pages/AddUsersPage";
import UpdateDeleteUsersPage from "./pages/UpdateDeleteUsersPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"; // ✅ Import ForgotPasswordPage
import Dashboard from "./pages/DashboardPage";
import Synchronization from "./pages/Synchronization";
import SyncLogs from "./pages/SyncLogs.js";
import Admin from "./pages/Admin";
import NiceCxoneSettingForm from "./pages/NiceCxoneSettingPage"; // ✅ Import NiceCxoneSettingForm

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100 w-100">
        <div className="flex-grow-1">
          {/* Define routes for each page */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route
              path="/security-settings"
              element={<SecuritySettingsPage />}
            />
            <Route path="/manage-users" element={<ManageUsersPage />} />
            <Route path="/add-users" element={<AddUsersPage />} />
            <Route
              path="/update-delete-users"
              element={<UpdateDeleteUsersPage />}
            />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />{" "}
            {/* ✅ New Route */}
            <Route path="/synchronization" element={<Synchronization />} />
            <Route path="/sync-logs" element={<SyncLogs />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/NiceCxoneSettingForm"
              element={<NiceCxoneSettingForm />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
