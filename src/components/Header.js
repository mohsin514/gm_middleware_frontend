import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logging out...");
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" className="px-5">
      <Navbar.Brand className="text-dark fw-bold">Dashboard</Navbar.Brand>
      <Nav className="ms-auto d-flex align-items-center">
        <span className="bg-light me-3">
          <FaUserCircle className="me-1" /> {username}
        </span>
        <Button variant="danger" onClick={handleLogout}>
          <FaSignOutAlt className="me-1" /> Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Header;
