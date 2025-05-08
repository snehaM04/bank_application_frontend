import React, { useState } from 'react';
import axios from 'axios';
import '../css/transfer.css';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const senderAccountId = localStorage.getItem("accountId");

  const handleTransfer = async () => {
    setMessage('');
    setError('');

    // Input validations
    if (!recipientAccountId.trim() || !amount.trim()) {
      setError("Both fields are required.");
      return;
    }

    if (isNaN(recipientAccountId) || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Enter valid numeric values. Amount must be greater than zero.");
      return;
    }

    if (recipientAccountId === senderAccountId) {
      setError("You cannot transfer to your own account.");
      return;
    }

    try {
      setIsLoading(true);

      // Check if recipient account exists
      const existsRes = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/account/existsAccountId/${recipientAccountId}`
      );

      if (!existsRes.data.exists) {
        setError("Recipient account does not exist.");
        setIsLoading(false);
        return;
      }

      const transferPayload = {
        fromAccount: senderAccountId,
        toAccount: recipientAccountId,
        amount: parseFloat(amount)
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/transaction/transfer`,
        transferPayload
      );

      setMessage(res.data.message || "Transfer successful!");
      setRecipientAccountId('');
      setAmount('');

      setTimeout(() => {
        navigate('/customer');
      }, 2000);
    } catch (err) {
      console.error("Transfer error:", err);
      setError(
        err?.response?.data?.message || "Transfer failed. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Funds</h2>

      <div className="form-group">
        <label>Recipient Account ID</label>
        <input
          type="text"
          value={recipientAccountId}
          onChange={(e) => setRecipientAccountId(e.target.value)}
          placeholder="Enter recipient account ID"
        />
      </div>

      <div className="form-group">
        <label>Amount to Transfer</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="1"
        />
      </div>

      <button onClick={handleTransfer} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Send Money'}
      </button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Transfer;
