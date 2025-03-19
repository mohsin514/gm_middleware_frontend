import React from "react";
import { FaShieldAlt, FaKey, FaLaptop, FaCheckCircle } from "react-icons/fa";
import { MdOutlineSecurity, MdDevices } from "react-icons/md";

const SecuritySettings = () => {
  return (
    <div className="w-100 h-100 p-4 shadow bg-white">
      {/* ✅ Header Section */}
      <h3 className="fw-bold mb-2 d-flex align-items-center">
        <FaShieldAlt className="me-2 text-primary" /> Security Settings
      </h3>
      <p className="text-muted mb-3">
        Manage your security settings and account access.
      </p>
      <hr className="border-2 border-dark" />

      {/* ✅ How You Sign In */}
      <div className="mb-4">
        <h5 className="fw-bold text-secondary">
          <MdOutlineSecurity className="me-2" /> How You Sign In
        </h5>
        <p className="text-muted small">
          Ensure you can always access your account by keeping this information
          up to date.
        </p>
        <div className="row g-3">
          {/* ✅ 2-Step Verification */}
          <div className="col-md-6">
            <h6 className="fw-bold">
              <FaShieldAlt className="me-2 text-warning" /> 2-Step Verification
            </h6>
          </div>
          <div className="col-md-6">
            <p className="mb-1 text-success">
              <FaCheckCircle className="me-2" /> Enabled since May 1, 2024
            </p>
          </div>
        </div>
        <hr className="border-1 border-secondary" />
      </div>

      {/* ✅ Passkeys Section */}
      <div className="mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <h6 className="fw-bold">
              <FaKey className="me-2 text-primary" /> Passkeys & Security Keys
            </h6>
          </div>
          <div className="col-md-6">
            <p className="mb-1">
              You have <strong>2 passkeys</strong> registered for your account.
            </p>
          </div>
        </div>
        <hr className="border-1 border-secondary" />
      </div>

      {/* ✅ Your Devices Section */}
      <div className="mb-4">
        <h5 className="fw-bold text-secondary">
          <MdDevices className="me-2" /> Your Devices
        </h5>
        <p className="text-muted">
          Manage your signed-in sessions and devices.
        </p>

        {/* ✅ Device Sessions */}
        <div className="row g-3">
          <div className="col-md-6">
            <p className="mb-1">
              <FaLaptop className="me-2 text-primary" />{" "}
              <strong>2 Sessions</strong> on Mac devices
            </p>
            <p className="text-muted small">Mac OS, Mill Valley, CA, USA</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1">
              <FaLaptop className="me-2 text-success" />{" "}
              <strong>Your Current Session</strong>
            </p>
            <p className="text-muted small">
              Mac OS, California, USA - Last active: Jan 8
            </p>
          </div>
        </div>
        <hr className="border-1 border-secondary" />
      </div>
    </div>
  );
};

export default SecuritySettings;
