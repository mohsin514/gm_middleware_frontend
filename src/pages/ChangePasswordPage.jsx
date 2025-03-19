import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../redux/userSettingsSlice";
import { FaLock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  // ✅ Password Validation Rules
  const validatePassword = (password) => {
    setValidations({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });

    if (name === "newPassword") {
      validatePassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !validations.length ||
      !validations.uppercase ||
      !validations.lowercase ||
      !validations.number ||
      !validations.specialChar
    ) {
      toast.error("Password does not meet the requirements!");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(changePassword(passwordData));
    toast.success("Password changed successfully!");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setValidations({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  return (
    <div className="w-100 h-100 p-5 shadow bg-white">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Header Section */}
      <h3 className="fw-bold d-flex align-items-center text-primary">
        <FaLock className="me-2" /> Change Password
      </h3>
      <p className="text-muted">
        Ensure your account is using a strong password.
      </p>

      {/* ✅ First Separator (Bold Black) */}
      <hr className="border-2 border-dark" />

      {/* ✅ Form Section (Left-Aligned) */}
      <div className="row g-3 mt-4">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            {/* ✅ Current Password */}
            <div className="mb-3">
              <label className="form-label fw-bold">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                className="form-control"
                placeholder="Enter Current Password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {/* ✅ New Password */}
            <div className="mb-3">
              <label className="form-label fw-bold">New Password</label>
              <input
                type="password"
                name="newPassword"
                className="form-control"
                placeholder="Enter New Password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            {/* ✅ Confirm Password */}
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm New Password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>
          </form>
          <h6 className="fw-bold">Password Requirements</h6>
          <ul className="list-unstyled small">
            <li className={validations.length ? "text-success" : "text-danger"}>
              {validations.length ? <FaCheckCircle /> : <FaTimesCircle />} At
              least 8 characters
            </li>
            <li
              className={validations.uppercase ? "text-success" : "text-danger"}
            >
              {validations.uppercase ? <FaCheckCircle /> : <FaTimesCircle />}{" "}
              One uppercase letter
            </li>
            <li
              className={validations.lowercase ? "text-success" : "text-danger"}
            >
              {validations.lowercase ? <FaCheckCircle /> : <FaTimesCircle />}{" "}
              One lowercase letter
            </li>
            <li className={validations.number ? "text-success" : "text-danger"}>
              {validations.number ? <FaCheckCircle /> : <FaTimesCircle />} One
              number
            </li>
            <li
              className={
                validations.specialChar ? "text-success" : "text-danger"
              }
            >
              {validations.specialChar ? <FaCheckCircle /> : <FaTimesCircle />}
              One special character (!@#$%^&*(),.?":{}|&lt;&gt;)
            </li>
          </ul>
        </div>
      </div>

      {/* ✅ Second Separator (Full Width Light Gray) */}
      <hr className="border-1 border-secondary w-100" />

      {/* ✅ Buttons (Right-Aligned) */}
      <div className="d-flex justify-content-end mt-3">
        <button className="btn btn-secondary me-2">Cancel</button>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
