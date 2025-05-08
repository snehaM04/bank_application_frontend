import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Customer.css';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const customerId = localStorage.getItem("customerId");

  // Fetch Customer Details
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/customer/getDetails/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };
    fetchCustomer();
  }, [customerId]);

  // Fetch Account Details
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/account/getAccountDetails/${customerId}`);
        setAccount(response.data);
        localStorage.setItem("accountId", response.data.accountId);
      } catch (error) {
        setAccount(null); // No account found
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [customerId]);

  const handleCreateAccount = async () => {
    if (!accountType || balance === '') return;

    const payload = {
      customerId: { customerId: parseInt(customerId) },
      accountType,
      balance: parseFloat(balance),
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/account/create`, payload);
      setMessage(response.data.message || "Account successfully created.");

      const updatedAccount = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/account/getAccountDetails/${customerId}`);
      setAccount(updatedAccount.data);
      localStorage.setItem("accountId", updatedAccount.data.accountId);
    } catch (error) {
      setMessage("Failed to create account. Please try again.");
    }
  };

  const redirectTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="dashboard">
      <h1>Customer Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {customer && (
            <div className="customer-details">
              <h2>Welcome, {customer.firstName} {customer.lastName}</h2>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phoneNumber}</p>
              <p><strong>Address:</strong> {customer.address}</p>
            </div>
          )}

          {account ? (
            <div className="account-section">
              <h3>Your Account</h3>
              <p><strong>Account ID:</strong> {account.accountId}</p>
              <p><strong>Type:</strong> {account.accountType}</p>
              <p><strong>Balance:</strong> ₹{account.balance}</p>

              <div className="account-actions">
                <button onClick={() => redirectTo("/deposit")}>Deposit</button>
                <button onClick={() => redirectTo("/withdraw")}>Withdraw</button>
                <button onClick={() => redirectTo("/transfer")}>Transfer</button>
                <button onClick={() => redirectTo("/transactions")}>Transaction History</button>
              </div>
            </div>
          ) : (
            <div className="create-account">
              <h3>Create an Account</h3>
              <div className="form-group">
                <label>
                  Account Type:
                  <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="">-- Select --</option>
                    <option value="SAVINGS">SAVINGS</option>
                    <option value="CURRENT">CURRENT</option>
                  </select>
                </label>

                <label>
                  Initial Balance:
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Enter amount"
                  />
                </label>

                <button onClick={handleCreateAccount} disabled={!accountType || balance === ''}>
                  Create Account
                </button>
              </div>
              {message && <p className="status-message">{message}</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerDashboard;
