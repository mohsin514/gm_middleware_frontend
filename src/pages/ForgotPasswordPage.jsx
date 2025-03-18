import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginOnlyFooter from "../components/LoginOnlyFooter"; // ✅ Import Footer

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Password reset link sent to: ${email}`);
    navigate("/login"); // ✅ Redirect back to login after submission
  };

  return (
    <div className="d-flex flex-column min-vh-100 ">
      {/* Main Content */}
      <div className="d-flex flex-grow-1 justify-content-center align-items-center">
        <div className=" p-4 w-100" style={{ maxWidth: "400px" }}>
          <h2 className="text-center text-primary mb-3">Forgot Password</h2>
          <p className="text-center text-muted">
            Enter your email to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-3">
            <a
              href="#"
              className="text-primary"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>

      {/* ✅ Sticky Footer */}
      <LoginOnlyFooter />
    </div>
  );
};

export default ForgotPasswordPage;
