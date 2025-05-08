import React, { useState } from 'react';
import axios from 'axios';
import '../css/deposit.css';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const accountId = localStorage.getItem('accountId');
  const navigate = useNavigate();

  const handleDeposit = async () => {
    setMessage('');
    setError('');

    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    if (!accountId) {
      setError('Account ID not found. Please log in again.');
      return;
    }

    const depositPayload = {
      accountId: parseInt(accountId),
      amount: parseFloat(amount)
    };

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/transaction/deposit`,
        depositPayload
      );

      setMessage(res.data.message || 'Deposit successful!');
      setAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (err) {
      console.error('Deposit failed:', err);
      setError(
        err?.response?.data?.message || 'Deposit failed. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transaction-container">
      <h2>Deposit Money</h2>

      <div className="transaction-form">
        <label htmlFor="amount">Enter Amount:</label>
        <input
          type="number"
          id="amount"
          min="1"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        <button onClick={handleDeposit} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
          {isLoading ? 'Processing...' : 'Deposit'}
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Deposit;
