import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/deposit.css';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [accountId, setAccountId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      setAccountId(parseInt(storedAccountId));
      console.log("Retrieved accountId from localStorage:", storedAccountId);
    } else {
      console.warn("No accountId found in localStorage.");
      setMessage("No account selected. Please log in again.");
    }
  }, []);

  const handleDeposit = async () => {
    if (!accountId || !amount || parseFloat(amount) <= 0) {
      setMessage("Please enter a valid amount.");
      console.error("Invalid deposit attempt. accountId:", accountId, "amount:", amount);
      return;
    }

    const depositPayload = {
      accountId,
      amount: parseFloat(amount)
    };

    console.log("Sending deposit request with payload:", depositPayload);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/transaction/deposit`,
        depositPayload
      );

      console.log("Deposit response:", response.data);
      setMessage(response.data || "Deposit successful!");
      setAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (error) {
      console.error("Deposit failed:", error.response?.data || error.message);
      setMessage("Deposit failed. Please try again.");
    }
  };

  return (
    <div className="transaction-container">
      <h2>Deposit Money</h2>
      <div className="transaction-form">
        <label>
          Enter Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="0"
          />
        </label>
        <button onClick={handleDeposit} disabled={!amount || parseFloat(amount) <= 0}>
          Deposit
        </button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Deposit;
