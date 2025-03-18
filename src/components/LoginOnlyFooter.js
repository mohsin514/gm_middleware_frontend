import React from "react";

const LoginOnlyFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Footer Logo */}
        <div style={styles.logoContainer}>
          <img
            src="/assets/footer-logo.jpg"
            alt="NICE CXone"
            id="footer-logo-cxone"
            style={styles.logo}
          />
        </div>

        {/* Footer Text */}
        <div id="footer-content-cxone" style={styles.text}>
          <div id="footer-copyright">
            Copyright © 2005-2025 NICE LTD Inc. All Rights Reserved.
          </div>
          <div>
            <a
              className="contact-us"
              href="https://www.nice.com/contact-us"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ✅ Inline Styles
const styles = {
  footer: {
    position: "sticky",
    bottom: 0,
    width: "100%",
    padding: "15px 0",
    textAlign: "center",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 15px",
  },
  logoContainer: {
    marginBottom: "-20px",
  },
  logo: {
    height: "80px", // Adjust as needed
    objectFit: "contain",
  },
  text: {
    color: "#6c757d",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default LoginOnlyFooter;
