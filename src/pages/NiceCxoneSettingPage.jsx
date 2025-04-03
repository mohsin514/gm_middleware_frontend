import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSettings,
  resetSettings,
} from "../redux/niceXconeSettingSlice.js";
import "bootstrap/dist/css/bootstrap.min.css";

const NiceCxoneSettingForm = () => {
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [inputValues, setInputValues] = useState({});
  const [hasFocused, setHasFocused] = useState({}); // Track if field was focused before
  const [showSecrets, setShowSecrets] = useState({});

  const toggleSecret = (key) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFocus = (key) => {
    if (!hasFocused[key]) {
      setInputValues((prev) => ({ ...prev, [key]: "" })); // Clear on first focus
      setHasFocused((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleChange = (e, section, key) => {
    const value = e.target.value;
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (section, key) => {
    if (inputValues[key] !== undefined) {
      dispatch(updateSettings({ key, value: inputValues[key], section }));
    }
  };

  return (
    <div className="container-fluid d-flex flex-column">
      <h2 className="mb-3 text-primary">NICE CXone Settings</h2>

      <div className="row flex">
        {/* Primary Business Unit Settings */}
        <div className="col-md-6 d-flex flex-column">
          <div className="card flex-grow-1" style={{ maxHeight: "60vh" }}>
            <div className="card-header bg-primary text-white p-2">
              Primary Business Unit
            </div>
            <div className="card-body overflow-auto p-2">
              {Object.entries(settings.primarySettings).map(([key, value]) => (
                <div className="mb-2" key={key}>
                  <label className="form-label">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="input-group">
                    <input
                      type={
                        key.includes("Secret") || key.includes("ClientId")
                          ? "password"
                          : "text"
                      }
                      className="form-control"
                      value={
                        inputValues[key] !== undefined
                          ? inputValues[key]
                          : value
                      }
                      onFocus={() => handleFocus(key)}
                      onChange={(e) => handleChange(e, "primarySettings", key)}
                      onBlur={() => handleBlur("primarySettings", key)}
                    />
                    {key.includes("Secret") && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => toggleSecret(key)}
                      >
                        {showSecrets[key] ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Backup Business Unit Settings */}
        <div className="col-md-6 d-flex flex-column">
          <div className="card flex-grow-1" style={{ maxHeight: "60vh" }}>
            <div className="card-header bg-secondary text-white p-2">
              Backup Business Unit
            </div>
            <div className="card-body overflow-auto p-2">
              {Object.entries(settings.backupSettings).map(([key, value]) => (
                <div className="mb-2" key={key}>
                  <label className="form-label">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <div className="input-group">
                    <input
                      type={
                        key.includes("Secret") || key.includes("ClientId")
                          ? "password"
                          : "text"
                      }
                      className="form-control"
                      value={
                        inputValues[key] !== undefined
                          ? inputValues[key]
                          : value
                      }
                      onFocus={() => handleFocus(key)}
                      onChange={(e) => handleChange(e, "backupSettings", key)}
                      onBlur={() => handleBlur("backupSettings", key)}
                    />
                    {key.includes("Secret") && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => toggleSecret(key)}
                      >
                        {showSecrets[key] ? "Hide" : "Show"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-end gap-3 mt-5">
        <button
          className="btn btn-danger"
          onClick={() => dispatch(resetSettings())}
        >
          Cancel
        </button>
        <button className="btn btn-success">Save</button>
      </div>
    </div>
  );
};

export default NiceCxoneSettingForm;
