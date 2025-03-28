import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword, setRememberMe } from "../redux/loginSlice";
import { FaUser, FaLock } from "react-icons/fa";
import { MdSync } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoginOnlyFooter from "../components/LoginOnlyFooter";
import { Toast, ToastContainer } from "react-bootstrap"; // ✅ Import Bootstrap Toast

const LoginPage = () => {
  const { username, password, rememberMe } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("danger");

  // ✅ Email Validation Function
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ✅ Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validate Fields
    const newErrors = {};
    if (!username.trim()) {
      newErrors.username = "Email is required";
    } else if (!isValidEmail(username)) {
      newErrors.username = "Enter a valid email address";
    }
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setToastMessage("Please fix the errors!");
      setToastVariant("danger");
      setShowToast(true);
      return;
    }

    // ✅ Success Message
    setToastMessage("Login Successful!");
    setToastVariant("success");
    setShowToast(true);

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* ✅ Toast Notification */}
      <ToastContainer
        className="p-3 position-fixed top-0 end-0"
        style={{ zIndex: 1050 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
          bg={toastVariant}
        >
          <Toast.Body className="text-white">
            <strong>{toastMessage}</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Main Content */}
      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="row w-100" style={{ maxWidth: "1000px" }}>
          <div className="p-4 h-100">
            <div className="row w-100">
              {/* Left Side - Image */}
              <div className="col-md-5 d-none d-md-block p-0">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/gmLogo.jpg`}
                  alt="Login"
                  className="img-fluid h-100 w-100 object-fit-cover rounded-start"
                />
              </div>
              <div className="col-md-7 d-none d-md-block p-0">
                {/* Right Side - Login Card */}
                <h2 className="text-center fw-semibold">
                  <span>PRODUCTION TO FAILOVER</span>
                  <div className="d-flex align-items-center justify-content-center mt-2">
                    <MdSync className="me-2 fs-3 text-primary" />{" "}
                    SYNCHRONIZATION
                  </div>
                </h2>
                <br />

                {/* Main Heading */}
                <h3 className="text-center text-secondary mb-3">WELCOME</h3>

                {/* Login Form */}
                <form className="mt-4" onSubmit={handleSubmit}>
                  {/* Email (Username) Field */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <input
                        type="email"
                        className={`form-control ${
                          errors.username ? "is-invalid" : ""
                        }`}
                        placeholder="Enter your email"
                        value={username}
                        onChange={(e) => {
                          dispatch(setUsername(e.target.value));
                          setErrors({ ...errors, username: "" });
                        }}
                      />
                    </div>
                    {errors.username && (
                      <div className="text-danger small mt-1">
                        {errors.username}
                      </div>
                    )}
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => {
                          dispatch(setPassword(e.target.value));
                          setErrors({ ...errors, password: "" });
                        }}
                      />
                    </div>
                    {errors.password && (
                      <div className="text-danger small mt-1">
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={rememberMe}
                        onChange={(e) =>
                          dispatch(setRememberMe(e.target.checked))
                        }
                      />
                      <label className="form-check-label">Remember Me</label>
                    </div>
                    <a
                      href="#"
                      className="text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgot-password");
                      }}
                    >
                      Forgot Password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn btn-primary w-100 mt-3">
                    SUBMIT
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <LoginOnlyFooter />
    </div>
  );
};

export default LoginPage;
