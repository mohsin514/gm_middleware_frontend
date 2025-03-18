import React, { useState } from "react";
import { MdSync } from "react-icons/md";
import "./Synchronization.css"; // ✅ Separate CSS file

const Synchronization = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  return (
    <div className="container text-center mt-5">
      <h2>Synchronization</h2>
      <button
        className={`btn btn-primary ${isSyncing ? "sync-animation" : ""}`}
        onClick={handleSync}
      >
        <MdSync className="me-2" /> {isSyncing ? "Syncing..." : "Start Sync"}
      </button>
    </div>
  );
};

export default Synchronization;
