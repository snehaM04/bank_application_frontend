import React, { useState } from 'react';
import axios from 'axios';
import '../css/transfer.css';
import { useNavigate } from 'react-router-dom';

const Transfer = () => {
  const [recipientAccountId, setRecipientAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const senderAccountId = localStorage.getItem("accountId");

  const navigate = useNavigate();

  const handleTransfer = async () => {
    setMessage('');
    setError('');

    if (!recipientAccountId || !amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid recipient account ID and amount.");
      return;
    }

    if (recipientAccountId === senderAccountId) {
      setError("You cannot transfer to your own account.");
      return;
    }

    try {
      const existsRes = await axios.get(`http://localhost:8085/api/account/existsAccountId/${recipientAccountId}`);
      if (!existsRes.data.exists) {
        setError("Recipient account does not exist.");
        return;
      }

      const transferPayload = {
        fromAccount: senderAccountId,
        toAccount: recipientAccountId,
        amount: parseFloat(amount)
      };

      const res = await axios.post("http://localhost:8085/api/transaction/transfer", transferPayload);
      setMessage(res.data.message || "Transfer successful!");
      setAmount('');
      setRecipientAccountId('');
      setTimeout(() => {
        navigate('/customer'); // Redirect to customer page after 2 seconds
      }, 2000);
    } catch (err) {
      setError("Transfer failed. Please try again.");
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
        />
      </div>

      <button onClick={handleTransfer}>Send Money</button>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Transfer;
