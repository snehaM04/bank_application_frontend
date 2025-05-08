import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/withdraw.css'; // Make sure it matches new class names

const Withdraw = () => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [status, setStatus] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);

  const accountId = localStorage.getItem('accountId');
  const navigate = useNavigate();

  const validateAmount = (amount) => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const handleWithdraw = async () => {
    setStatus({ message: '', type: '' });

    if (!validateAmount(withdrawAmount)) {
      setStatus({ message: 'Please enter a valid amount greater than 0.', type: 'error' });
      return;
    }

    const payload = {
      accountId: parseInt(accountId),
      amount: parseFloat(withdrawAmount),
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/transaction/withdraw`,
        payload
      );

      setStatus({ message: response.data.message || 'Withdrawal successful!', type: 'success' });
      setWithdrawAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (error) {
      console.error('Withdraw Error:', error);
      setStatus({
        message: error?.response?.data?.message || 'Withdrawal failed. Please try again later.',
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="withdraw-page">
      <div className="withdraw-card">
        <h2>Withdraw Funds</h2>

        <div className="input-section">
          <label htmlFor="withdrawAmount">Amount (₹)</label>
          <input
            id="withdrawAmount"
            type="number"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />
        </div>

        <button
          className="withdraw-btn"
          onClick={handleWithdraw}
          disabled={loading || !withdrawAmount}
        >
          {loading ? 'Processing...' : 'Withdraw'}
        </button>

        {status.message && (
          <p className={`status-message ${status.type}`}>
            {status.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Withdraw;
