import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/userSettingsSlice";
import { FaUser, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { firstName, lastName, email } = useSelector(
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
            <div className="col-md-6 text-muted">{profileData.email}</div>
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

          <div className="row">
            <div className="col-md-6 fw-bold">Date Format</div>
            <div className="col-md-6 text-muted">
              {profileData.dateFormat}{" "}
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
            <div className="col-md-6 fw-bold">Automatic Timezone</div>
            <div className="col-md-6">
              <Form.Check
                type="switch"
                checked={autoTimezone}
                onChange={() => setAutoTimezone(!autoTimezone)}
              />
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

            <div className="mb-3">
              <label className="form-label fw-bold">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={profileData.title}
                onChange={handleChange}
              />
            </div>

            <hr className="border-secondary" />

            <h5 className="fw-bold mt-4">Languages & Dates</h5>
            <p className="text-muted small">
              Choose what language and date format to use throughout your
              account.
            </p>
            <hr className="border-2 border-dark" />

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

            <div className="mb-3">
              <label className="form-label fw-bold">Date Format</label>
              <select
                name="dateFormat"
                className="form-select"
                value={profileData.dateFormat}
                onChange={handleChange}
              >
                <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                <option value="MM-DD-YYYY">MM-DD-YYYY</option>
              </select>
            </div>

            <hr className="border-secondary" />

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
            <hr className="border-secondary" />

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
