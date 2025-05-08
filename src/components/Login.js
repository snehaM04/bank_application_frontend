import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import '../css/Login.css';
import axios from 'axios';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    errors: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const { setIsLoggedIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    let errors = {};
    let isValid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/login`,
          {
            email,
            password,
          }
        );

        const data = response.data;

        // Save customerId to localStorage
        localStorage.setItem('customerId', data.customerId);
        console.log('Customer ID:', data.customerId);

        setSuccessMessage('Login successful!');
        setIsLoggedIn(true);
        navigate('/customer');
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.status === 401) {
          setSuccessMessage('Email or password is incorrect');
        } else {
          setSuccessMessage('Something went wrong. Please try again.');
        }
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        errors,
      }));
    }
  };

  const { email, password, errors } = state;

  return (
    <section className='hero'>
      <div className='container-login'>
        <div className='titlecontainer'>
          <h2>Enter your details to Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputs'>
            Email:
            <input
              type='text'
              name='email'
              value={email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className='error-msg'>{errors.email}</div>}
            Password:
            <input
              type='password'
              name='password'
              value={password}
              onChange={handleInputChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className='error-msg'>{errors.password}</div>}
          </div>
          <div className='login'>
            <button type='submit'>Login</button>
          </div>
          <br />
        </form>
        {successMessage && <h6>{successMessage}</h6>}
      </div>
    </section>
  );
};

export default Login;
