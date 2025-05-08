import React, { useState } from 'react';
import axios from 'axios';
import '../css/withdraw.css';
import { useNavigate } from 'react-router-dom';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const accountId = localStorage.getItem('accountId');

  const handleWithdraw = async () => {
    setMessage('');
    setError('');

    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      setError('Please enter a valid positive amount.');
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        accountId: parseInt(accountId),
        amount: parseFloat(amount)
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/transaction/withdraw`,
        payload
      );

      setMessage(res.data.message || 'Withdrawal successful!');
      setAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (err) {
      console.error('Withdrawal error:', err);
      setError(
        err?.response?.data?.message || 'Withdrawal failed. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="withdraw-container">
      <h2>Withdraw Funds</h2>

      <div className="form-group">
        <label>Amount to Withdraw</label>
        <input
          type="number"
          min="1"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <button onClick={handleWithdraw} disabled={isLoading || !amount || parseFloat(amount) <= 0}>
        {isLoading ? 'Processing...' : 'Withdraw'}
      </button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Withdraw;
