import React, { useState } from 'react';
import '../css/Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: ''
  });

  const [successMessage, setSuccessMessage] = useState('');

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (!firstName.trim() || !/^[a-zA-Z]/.test(firstName.trim())) {
      errorsCopy.firstName = 'First name must start with a letter';
      valid = false;
    }
    if (!lastName.trim() || !/^[a-zA-Z]/.test(lastName.trim())) {
      errorsCopy.lastName = 'Last name must start with a letter';
      valid = false;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      errorsCopy.email = 'Please enter a valid email address';
      valid = false;
    }
    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      errorsCopy.phoneNumber = 'Please enter a valid 10-digit phone number';
      valid = false;
    }
    if (!address.trim()) {
      errorsCopy.address = 'Address is required';
      valid = false;
    }
    if (!password || password.length < 6) {
      errorsCopy.password = 'Password must be at least 6 characters long';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  async function saveForm(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/customer/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            address,
            password
          })
        });
        if (response.ok) {
          setSuccessMessage('Registered successfully !!');
          // Optionally, reset the form fields
          setFirstName('');
          setLastName('');
          setEmail('');
          setPhoneNumber('');
          setAddress('');
          setPassword('');
        } else {
          console.error('Registration failed:', response.statusText);
          // Handle error scenario, if needed
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle error scenario, if needed
      }
    }
  }

  return (
   <section className='top'>
    <div className='container'>
      <div className='header'>
        <h1>Create new account</h1>
      </div>
            <form>
              <div className='inputs'>
                <input 
                type='text' 
                placeholder='Enter your First Name' 
                name='firstName' 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} />
                {errors.firstName && <div className='error'>{errors.firstName}</div>}
                <input
                type='text' 
                placeholder='Enter your Last Name' 
                name='lastName' 
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)} />
                {errors.lastName && <div className='error'>{errors.lastName}</div>}
                <input 
                type='text' 
                placeholder='Enter your Email' 
                name='email' 
                value={email} 
                onChange={(e)=>  setEmail(e.target.value)} />
                {errors.email && <div className='error'>{errors.email}</div>}
                <input 
                type='text' 
                placeholder='Enter your phone number' 
                name='phoneNumber' 
                value={phoneNumber} 
                onChange={(e)=>   setPhoneNumber(e.target.value)} />
                {errors.phoneNumber && <div className='error'>{errors.phoneNumber}</div>}
                <input 
                type='text' 
                placeholder='Enter your address' 
                name='address' 
                value={address} 
                onChange={(e)=>setAddress(e.target.value)} />
                 {errors.address && <div className='error'>{errors.address}</div>}
                <input 
                type='password' 
                placeholder='Set strong password' 
                name='password' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} />
                {errors.password && <div className='error'>{errors.password}</div>}
              </div>

              <button type='submit' onClick={saveForm}>Submit</button>
              <br></br>
            </form>
            {successMessage && <h6>{successMessage}</h6>}
            <br></br>
          </div>
          </section>
  );
  }
export default Register;
