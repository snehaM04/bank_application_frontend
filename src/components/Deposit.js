import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/deposit.css'; // Make sure your CSS matches new class names

const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const navigate = useNavigate();

  const accountId = localStorage.getItem("accountId");

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setFeedback({ message: "Please enter a valid amount greater than 0.", type: "error" });
      return;
    }

    const payload = {
      accountId: parseInt(accountId),
      amount: parseFloat(amount),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/transaction/deposit`, payload);
      setFeedback({ message: response.data || "Deposit successful!", type: "success" });
      setAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (error) {
      console.error("Deposit error:", error);
      setFeedback({ message: "Deposit failed. Please try again later.", type: "error" });
    }
  };

  return (
    <div className="deposit-page">
      <div className="deposit-card">
        <h2>Deposit Funds</h2>
        
        <div className="input-group">
          <label htmlFor="amount">Amount (₹):</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter deposit amount"
            min="1"
          />
        </div>

        <button
          className="deposit-btn"
          onClick={handleDeposit}
          disabled={!amount}
        >
          Deposit
        </button>

        {feedback.message && (
          <p className={`feedback ${feedback.type}`}>
            {feedback.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Deposit;
