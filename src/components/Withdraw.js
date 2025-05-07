import React, { useState } from 'react';
import axios from 'axios';
import '../css/withdraw.css';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const accountId = localStorage.getItem('accountId');

  const navigate = useNavigate();

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    axios.post(`http://localhost:8085/api/transaction/withdraw`, {
      accountId: parseInt(accountId),
      amount: parseFloat(amount)
    })
      .then(res => {
        setMessage(res.data.message || 'Withdrawal successful!');
        setAmount('');
        setTimeout(() => {
          navigate('/customer'); // Redirect to customer page after 2 seconds
        }, 2000);
      })
      .catch(err => {
        console.error('Withdrawal error:', err);
        setMessage('Withdrawal failed. Please try again.');
      });
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Funds</h2>

      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />

      <button onClick={handleWithdraw} disabled={!amount || parseFloat(amount) <= 0}>
        Withdraw
      </button>

      {message && <p className="withdraw-message">{message}</p>}
    </div>
  );
};

export default Withdraw;
