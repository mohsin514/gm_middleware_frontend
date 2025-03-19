import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleAccessNotifications,
  toggleSyncFailureNotifications,
} from "../redux/userSettingsSlice";
import { FaBell, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Notifications = () => {
  const dispatch = useDispatch();
  const { accessNotifications, syncFailureNotifications } = useSelector(
    (state) => state.userSettings
  );

  return (
    <div className="w-100 h-100 p-5 shadow bg-white">
      {/* ✅ Header Section */}
      <h3 className="fw-bold d-flex align-items-center text-primary">
        <FaBell className="me-2" /> Notifications
      </h3>
      <p className="text-muted">
        Manage your notification preferences for important events.
      </p>

      {/* ✅ First Separator (Bold Black) */}
      <hr className="border-2 border-dark" />

      {/* ✅ Notification Toggles (Left-Aligned) */}
      <div className="row g-3 mt-4">
        {/* ✅ Access Change Notifications */}
        <div className="col-md-6">
          <h6 className="fw-bold">Access Change Notifications</h6>
          <p className="text-muted small">
            Get alerts when your access is added, updated, or removed.
          </p>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={accessNotifications}
              onChange={() => dispatch(toggleAccessNotifications())}
            />
            <label className="form-check-label">
              {accessNotifications ? (
                <FaCheckCircle className="text-success me-2" />
              ) : (
                <FaTimesCircle className="text-danger me-2" />
              )}
              Enable Access Notifications
            </label>
          </div>
        </div>

        {/* ✅ Light Gray Separator */}
        <div className="w-100">
          <hr className="border-1 border-secondary" />
        </div>

        {/* ✅ Sync Failure Notifications */}
        <div className="col-md-6">
          <h6 className="fw-bold">Synchronization Failure Alerts</h6>
          <p className="text-muted small">
            Receive an alert when a step in the synchronization job fails.
          </p>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={syncFailureNotifications}
              onChange={() => dispatch(toggleSyncFailureNotifications())}
            />
            <label className="form-check-label">
              {syncFailureNotifications ? (
                <FaCheckCircle className="text-success me-2" />
              ) : (
                <FaTimesCircle className="text-danger me-2" />
              )}
              Enable Sync Failure Alerts
            </label>
          </div>
        </div>
      </div>

      {/* ✅ Final Separator */}
      <hr className="border-1 border-dark mt-3" />
    </div>
  );
};

export default Notifications;
