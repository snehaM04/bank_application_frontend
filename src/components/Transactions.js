import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/transactions.css";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      if (!accountId) {
        setError("No account ID found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/transaction/transactionHistory`,
          {
            params: { accountId },
          }
        );
        if (response.data.length === 0) {
          setError("No transactions found.");
        } else {
          setTransactions(response.data);
        }
      } catch (err) {
        console.error("Transaction fetch error:", err);
        setError(err.response?.data?.message || "Error fetching transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionHistory();
  }, [accountId]);

  return (
    <div className="transaction-history-container">
      <h2>Transaction History</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
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
