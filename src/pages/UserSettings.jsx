import React, { useState } from "react";
import { FaUserCog } from "react-icons/fa";
import "./UserSettings.css";

const UserSettings = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleSave = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 2000);
  };

  return (
    <div className="container text-center mt-5">
      <h2>User Settings</h2>
      <button
        className={`btn btn-success ${isShaking ? "shake-animation" : ""}`}
        onClick={handleSave}
      >
        <FaUserCog className="me-2" /> Save Settings
      </button>
    </div>
  );
};

export default UserSettings;
