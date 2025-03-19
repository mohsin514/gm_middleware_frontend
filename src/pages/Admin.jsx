import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, deleteUser } from "../redux/usersSlice";
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaSearch,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "View Only User",
  });

  const [editing, setEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Email Validation Function
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.firstName.trim() || !userData.lastName.trim()) {
      toast.error("First Name & Last Name are required!");
      return;
    }
    if (!isValidEmail(userData.email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (editing) {
      dispatch(updateUser(userData));
      toast.success("User updated successfully!");
    } else {
      dispatch(addUser({ ...userData, id: Date.now() }));
      toast.success("User added successfully!");
    }
    resetForm();
  };

  // ✅ Handle Edit User
  const handleEdit = (user) => {
    setUserData(user);
    setEditing(true);
    setShowForm(true);
  };

  // ✅ Reset Form
  const resetForm = () => {
    setUserData({
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "View Only User",
    });
    setEditing(false);
    setShowForm(false);
  };

  // ✅ Confirm Delete User (Custom Alert)
  const handleDelete = (id) => {
    toast.error(
      <div className="text-center">
        <p className="fw-bold mb-3">Are you sure you want to delete?</p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-danger btn-sm rounded-3 px-4"
            onClick={() => {
              dispatch(deleteUser(id));
              toast.dismiss();
              toast.success("User deleted successfully!");
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-secondary btn-sm rounded-3 px-4"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="container-fluid mt-4 px-5">
      <ToastContainer position="top-right" />

      {/* ✅ Page Title */}
      <h2 className="fw-bold">
        <FaUserShield className="me-2" /> Admin Panel - User Management
      </h2>

      <hr className="border-2 border-dark mt-1" />

      {/* ✅ Search Bar */}
      {!showForm && (
        <div className="d-flex justify-content-end my-3">
          <div className="input-group w-50">
            <span className="input-group-text bg-light">
              <FaSearch className="text-secondary" />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* ✅ User List Table */}
      {!showForm && (
        <>
          <div className="table-responsive">
            <table className="table table-hover shadow-sm">
              <thead className="table-primary">
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users
                    .filter((user) =>
                      user?.email
                        ?.toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user.id}>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() => handleEdit(user)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No users found. Add users to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* ✅ Add New User Button (Under Table) */}
          <div className="d-flex justify-content-end mt-3">
            <button
              className="btn btn-success"
              onClick={() => setShowForm(true)}
            >
              <FaUserPlus className="me-2" /> Add New User
            </button>
          </div>
        </>
      )}

      {/* ✅ User Form (Full Width) */}
      {showForm && (
        <div className="mt-4">
          <h5 className="fw-bold">{editing ? "Edit User" : "Add New User"}</h5>

          <hr className="border-dark" />

          <form onSubmit={handleSubmit} className="w-100">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Role</label>
              <select
                name="role"
                className="form-select"
                value={userData.role}
                onChange={handleChange}
              >
                <option value="View Only User">View Only User</option>
                <option value="Can Trigger Sync Process">
                  Can Trigger Sync Process
                </option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <hr className="border-secondary mt-5" />

            {/* ✅ Buttons */}
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success me-2">
                {editing ? "Update User" : "Add User"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
