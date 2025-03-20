import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ username }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ✅ Show Logout Confirmation Modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  // ✅ Confirm Logout & Redirect
  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    toast.success("You have been logged out successfully!");
    setTimeout(() => {
      navigate("/login"); // Redirect after showing toast
    }, 1500);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      {/* ✅ Professional Header */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-5 shadow-sm">
        <Navbar.Brand className="text-light fw-bold">Dashboard</Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center">
          {/* ✅ User Info */}
          <span className="text-light me-3 d-flex align-items-center">
            <FaUserCircle className="me-2" size={20} /> {username}
          </span>

          {/* ✅ Logout Button */}
          <Button variant="outline-light" onClick={handleLogoutClick}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Nav>
      </Navbar>

      {/* ✅ Custom Logout Modal */}
      <Modal
        show={showLogoutModal}
        onHide={() => setShowLogoutModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogoutConfirm}>
            <FaSignOutAlt className="me-2" /> Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Header;
