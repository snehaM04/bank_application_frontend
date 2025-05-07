import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/transactions.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  // Get the logged-in user's accountId from localStorage
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8085/api/transaction/transactionHistory`,
          {
            params: { accountId },
          }
        );
        setTransactions(response.data);
        setError("");
      } catch (err) {
        setTransactions([]);
        setError(err.response?.data?.message || "No transactions found.");
      }
    };

    if (accountId) {
      fetchTransactionHistory();
    } else {
      setError("No account ID found. Please log in again.");
    }
  }, [accountId]);

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>
      {error && <p className="error-message">{error}</p>}
      {transactions.length > 0 && (
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.transactionId}>
                <td>{txn.transactionId}</td>
                <td>{txn.transactionType}</td>
                <td>₹{txn.amount.toFixed(2)}</td>
                <td>{txn.transactionMessage}</td>
                <td>{new Date(txn.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
