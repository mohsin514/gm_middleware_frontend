import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/userSettingsSlice";
import { FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email, role } = useSelector(
    (state) => state.userSettings
  );

  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName,
    lastName,
    email,
    title: "Product Manager",
    language: "English",
    dateFormat: "DD-MM-YYYY",
    timezone: "UTC",
  });

  const [autoTimezone, setAutoTimezone] = useState(true);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateProfile(profileData));
    toast.success("Profile updated successfully!");
    setEditMode(false);
  };

  return (
    <div className="w-100 h-100 p-5 shadow bg-white">
      <ToastContainer position="top-right" />

      {/* ✅ Header Section */}
      <h3 className="fw-bold text-primary">
        <FaUser className="me-2" /> Profile
      </h3>
      <p className="text-muted">Manage your personal account settings.</p>
      <hr className="border-2 border-dark" />

      {!editMode ? (
        <>
          {/* ✅ View Mode - Profile Details */}
          <div className="row">
            <div className="col-md-6 fw-bold">Full Name</div>
            <div className="col-md-6 text-muted">
              {profileData.firstName} {profileData.lastName}{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setEditMode(true)}
              >
                Update
              </button>
            </div>
          </div>
          <hr className="border-1 border-secondary" />

          <div className="row">
            <div className="col-md-6 fw-bold">Email Address</div>
            <div className="col-md-6 text-muted">
              {profileData.email}{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setEditMode(true)}
              >
                Update
              </button>
            </div>
          </div>
          <hr className="border-1 border-secondary" />

          <div className="row">
            <div className="col-md-6 fw-bold">Title</div>
            <div className="col-md-6 text-muted">
              {profileData.title}{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setEditMode(true)}
              >
                Update
              </button>
            </div>
          </div>
          <hr className="border-1 border-secondary" />

          {/* ✅ Language & Date Settings */}
          <h5 className="fw-bold mt-4">Languages & Dates</h5>
          <p className="text-muted small">
            Choose your preferred language and date format.
          </p>
          <hr className="border-2 border-dark" />

          <div className="row">
            <div className="col-md-6 fw-bold">Language</div>
            <div className="col-md-6 text-muted">
              {profileData.language}{" "}
              <button
                className="btn btn-link p-0 text-primary"
                onClick={() => setEditMode(true)}
              >
                Update
              </button>
            </div>
          </div>
          <hr className="border-1 border-secondary" />

          {/* ✅ Auto Timezone Toggle & Dropdown */}
          <div className="row">
            <div className="col-md-6 fw-bold">Automatic Timezone</div>
            <div className="col-md-6">
              <Form.Check
                type="switch"
                checked={autoTimezone}
                onChange={() => setAutoTimezone(!autoTimezone)}
              />
            </div>
          </div>

          {/* ✅ Always Visible Timezone Dropdown (Disabled when Auto) */}
          <div className="row mt-3">
            <div className="col-md-6 fw-bold">Timezone</div>
            <div className="col-md-6">
              <select
                name="timezone"
                className="form-select"
                value={profileData.timezone}
                onChange={handleChange}
                disabled={autoTimezone}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">New York (EST)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Asia/Karachi">Karachi (PKT)</option>
              </select>
            </div>
          </div>

          <hr className="border-1 border-secondary" />
        </>
      ) : (
        /* ✅ Edit Mode */
        <>
          <h5 className="fw-bold text-primary">Edit Profile</h5>
          <hr className="border-dark" />

          <form>
            <div className="mb-3">
              <label className="form-label fw-bold">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-control"
                value={profileData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-control"
                value={profileData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* ✅ Allow Anyone to Edit Email */}
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={profileData.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Language</label>
              <select
                name="language"
                className="form-select"
                value={profileData.language}
                onChange={handleChange}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* ✅ Auto Timezone Toggle */}
            <div className="row">
              <div className="col-md-6 fw-bold">Automatic Timezone</div>
              <div className="col-md-6">
                <Form.Check
                  type="switch"
                  checked={autoTimezone}
                  onChange={() => setAutoTimezone(!autoTimezone)}
                />
              </div>
            </div>

            {/* ✅ Timezone Dropdown (Always Visible, Disabled if Auto) */}
            <div className="mb-3 mt-3">
              <label className="form-label fw-bold">Timezone</label>
              <select
                name="timezone"
                className="form-select"
                value={profileData.timezone}
                onChange={handleChange}
                disabled={autoTimezone}
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">New York (EST)</option>
                <option value="Europe/London">(PST)</option>
                <option value="Europe/London">(AKST)</option>
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn btn-success me-2" onClick={handleSave}>
                <FaCheck className="me-2" /> Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditMode(false)}
              >
                <FaTimes className="me-2" /> Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Profile;
