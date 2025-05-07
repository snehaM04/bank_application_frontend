import React from 'react';
import '../css/InfoPages.css';

const About = () => (
  <div className="info-container">
    <h2 className="info-title">About Us</h2>
    <p className="info-text">
      Indian Overseas Bank (IOB) has been a trusted name in banking for over 85 years. Established in 1937, we aim to deliver
      secure, efficient, and personalized financial services to individuals and businesses across India and beyond.
    </p>
    <p className="info-text">
      Our mission is to empower customers with innovative digital banking solutions while maintaining our legacy of trust and integrity.
      We offer a wide range of services including savings, current and fixed deposit accounts, loans, credit cards, digital wallets, and more.
    </p>
    <p className="info-text">
      With a presence in major cities and rural areas, we are committed to financial inclusion and customer satisfaction.
      Whether you are planning your future, expanding your business, or managing your day-to-day finances — IOB is here to help.
    </p>
    <h3 className="info-subtitle">Why Choose Us?</h3>
    <ul className="info-list">
      <li>24/7 secure online banking access</li>
      <li>Customer-centric services with dedicated support</li>
      <li>Wide network of ATMs and branches</li>
      <li>Transparent and ethical banking practices</li>
      <li>Latest technologies including UPI, mobile app, and net banking</li>
    </ul>
  </div>
);

export default About;
