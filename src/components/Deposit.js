import React, { useState } from 'react';
import axios from 'axios';
import '../css/deposit.css'; // You can rename or style accordingly
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  
  const accountId = localStorage.getItem("accountId"); // Make sure this is stored after login/account fetch

  const navigate = useNavigate();

  const handleDeposit = () => {
    if (!accountId || !amount) {
      setMessage("Please enter a valid amount.");
      return;
    }

    const depositPayload = {
      accountId: parseInt(accountId),
      amount: parseFloat(amount)
    };

    console.log("Sending deposit request:", depositPayload);

    axios.post("http://localhost:8085/api/transaction/deposit", depositPayload)
      .then(res => {
        setMessage(res.data || "Deposit successful!");
        setAmount('');
        setTimeout(() => {
          navigate('/customer'); // Redirect to customer page after 2 seconds
        }, 2000);
      })
      .catch(err => {
        console.error("Deposit failed:", err);
        setMessage("Deposit failed. Please try again.");
      });
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
            onChange={e => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </label>
        <button onClick={handleDeposit} disabled={!amount}>Deposit</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Deposit;
