import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Customer.css';

const Customer = () => {
  const [customer, setCustomer] = useState(null);
  const [account, setAccount] = useState(null);
  const [newAccountType, setNewAccountType] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const customerId = localStorage.getItem("customerId");

  useEffect(() => {
    axios.get(`http://localhost:8085/api/customer/getDetails/${customerId}`)
      .then(res => setCustomer(res.data))
      .catch(err => console.error("Failed to fetch customer details:", err));

    axios.get(`http://localhost:8085/api/account/getAccountDetails/${customerId}`)
      .then(res => {
        setAccount(res.data);
        localStorage.setItem("accountId", res.data.accountId); // ✅ correct place
        console.log("Account ID:", res.data.accountId); // ✅ correct place
      })
      .catch(() => setAccount(null));
  }, [customerId]);

  const handleCreateAccount = () => {
    const accountPayload = {
      customerId: { customerId: parseInt(customerId) },
      accountType: newAccountType,
      balance: parseFloat(initialBalance)
    };

    axios.post("http://localhost:8085/api/account/create", accountPayload)
      .then(res => {
        alert(res.data.message || "Account successfully created.");
        return axios.get(`http://localhost:8085/api/account/getAccountDetails/${customerId}`);
      })
      .then(accRes => {
        setAccount(accRes.data);
        localStorage.setItem("accountId", accRes.data.accountId); // ✅ Updated to accRes
        console.log("Account ID:", accRes.data.accountId);
      })
      .catch(() => alert("Failed to create account"));
  };

  const redirectTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="customer-dashboard">
      <h1>Customer Dashboard</h1>

      {customer ? (
        <div className="customer-info">
          <h2>Welcome, {customer.firstName} {customer.lastName}</h2>
          <p><strong>Email:</strong> {customer.email}</p>
          <p><strong>Phone:</strong> {customer.phoneNumber}</p>
          <p><strong>Address:</strong> {customer.address}</p>
        </div>
      ) : (
        <p>Loading customer data...</p>
      )}

      {account ? (
        <div className="account-info">
          <h3>Your Account</h3>
          <p><strong>Account ID:</strong> {account.accountId}</p>
          <p><strong>Type:</strong> {account.accountType}</p>
          <p><strong>Balance:</strong> ₹{account.balance}</p>

          <div className="action-buttons">
            <button onClick={() => redirectTo("/deposit")}>Deposit</button>
            <button onClick={() => redirectTo("/withdraw")}>Withdraw</button>
            <button onClick={() => redirectTo("/transfer")}>Transfer</button>
            <button onClick={() => redirectTo("/transactions")}>Transaction History</button>
          </div>
        </div>
      ) : (
        <div className="no-account">
          <h3>Create a New Account</h3>
          <div className="account-form">
            <label>
              Account Type:
              <select value={newAccountType} onChange={e => setNewAccountType(e.target.value)}>
                <option value="">-- Select --</option>
                <option value="SAVINGS">SAVINGS</option>
                <option value="CURRENT">CURRENT</option>
              </select>
            </label>

            <label>
              Initial Balance:
              <input
                type="number"
                value={initialBalance}
                onChange={e => setInitialBalance(e.target.value)}
                placeholder="Enter amount"
              />
            </label>

            <button
              onClick={handleCreateAccount}
              disabled={!newAccountType || initialBalance === ''}
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customer;
