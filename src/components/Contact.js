import React from 'react';
import '../css/InfoPages.css';

const Contact = () => (
  <div className="info-container">
    <h2 className="info-title">Contact Us</h2>
    <p className="info-text">We’re here to assist you with any banking-related inquiries or support requests.</p>

    <h3 className="info-subtitle">Customer Support</h3>
    <ul className="info-list">
      <li>Email: <a href="mailto:support@iobbank.com">support@iobbank.com</a></li>
      <li>Phone: 1800-425-4445 (Toll-Free)</li>
      <li>WhatsApp Support: +91-9876543210</li>
    </ul>

    <h3 className="info-subtitle">Head Office</h3>
    <p className="info-text">
      Indian Overseas Bank,<br />
      Central Office, 763 Anna Salai,<br />
      Chennai – 600002, Tamil Nadu, India
    </p>

    <h3 className="info-subtitle">Social Media</h3>
    <ul className="info-list">
      <li>Twitter: <a href="https://twitter.com/iobbank" target="_blank" rel="noopener noreferrer">@IOBBank</a></li>
      <li>Facebook: <a href="https://facebook.com/iobbank" target="_blank" rel="noopener noreferrer">IOB Facebook</a></li>
      <li>LinkedIn: <a href="https://linkedin.com/company/iobbank" target="_blank" rel="noopener noreferrer">IOB LinkedIn</a></li>
    </ul>
  </div>
);

export default Contact;
