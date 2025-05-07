import React from "react";
import { Link} from "react-router-dom";
import "../css/Footer.css";

function Footer() {


  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About IOB Bank</h2>
          <p>
            Experience secure and seamless online banking. Manage your
            accounts, transfer funds, and access financial services from anywhere, anytime.
          </p>
        </div>

        <div className="footer-section">
          <h2>Quick Links</h2>
          <ul>
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/about">About Us</Link></li>
            <li><Link className="link" to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>Email: support@iobbank.com</p>
          <p>Phone: +91 99321 09823</p>
          <p>Address: 222, Raja Street, Vengal, Thiruvallur, TN</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 IOB Bank | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;
