import React, { useState } from 'react';
import '../css/Register.css';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: '', // clear error on change
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim() || !/^[a-zA-Z]/.test(formData.firstName)) {
      newErrors.firstName = 'First name must start with a letter';
      isValid = false;
    }
    if (!formData.lastName.trim() || !/^[a-zA-Z]/.test(formData.lastName)) {
      newErrors.lastName = 'Last name must start with a letter';
      isValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/customer/create`, formData);
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Registered successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          address: '',
          password: '',
        });
      } else {
        setSuccessMessage('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setSuccessMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="top">
      <div className="container">
        <div className="header">
          <h1>Create New Account</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <div className="error">{errors.firstName}</div>}

            <input
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <div className="error">{errors.lastName}</div>}

            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <div className="error">{errors.email}</div>}

            <input
              type="text"
              name="phoneNumber"
              placeholder="Enter your Phone Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}

            <input
              type="text"
              name="address"
              placeholder="Enter your Address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <div className="error">{errors.address}</div>}

            <input
              type="password"
              name="password"
              placeholder="Set a Strong Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {successMessage && <h6 className="success-message">{successMessage}</h6>}
      </div>
    </section>
  );
};

export default Register;
