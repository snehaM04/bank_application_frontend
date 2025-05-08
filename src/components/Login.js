import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import '../css/Login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/login`,
        { email, password }
      );

      // Assuming backend returns JSON with customerId
      const data = response.data;

      localStorage.setItem('customerId', data.customerId); // Save to localStorage
      setSuccessMessage('Login successful!');
      console.log('Login successful:', data);
      setIsLoggedIn(true);
      navigate('/customer');
    } catch (error) {
      console.error('Login failed:', error);
      setSuccessMessage('Email or password is incorrect.');
    }
  };

  return (
    <section className='hero'>
      <div className='container-login'>
        <div className='titlecontainer'>
          <h2>Enter your details to Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            <label>Email:</label>
            <input
              type='text'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className='error-msg'>{errors.email}</div>}

            <label>Password:</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className='error-msg'>{errors.password}</div>}
          </div>
          <div className='login'>
            <button type='submit'>Login</button>
          </div>
        </form>
        {successMessage && <h6>{successMessage}</h6>}
      </div>
    </section>
  );
};

export default Login;
