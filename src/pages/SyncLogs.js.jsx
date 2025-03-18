import React, { useState } from "react";
import { MdOutlineHistory } from "react-icons/md";
import "./SyncLogs.css";

const SyncLogs = () => {
  const [isFlashing, setIsFlashing] = useState(false);

  const reloadLogs = () => {
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 2000);
  };

  return (
    <div className="container text-center mt-5">
      <h2>Synchronization Logs</h2>
      <button
        className={`btn btn-secondary ${isFlashing ? "flash-animation" : ""}`}
        onClick={reloadLogs}
      >
        <MdOutlineHistory className="me-2" /> Reload Logs
      </button>
    </div>
  );
};

export default SyncLogs;
