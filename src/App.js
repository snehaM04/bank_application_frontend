import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Customer from './components/Customer';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import Transfer from './components/Transfer';
import Transactions from './components/Transactions';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';

// Create Auth Context
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


// Route guard
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const PublicRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/customer" replace /> : element;
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('customerId');
  });


  useEffect(() => {
    console.log("Login status changed:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <div className="app-container">
        <Router>
          <Header />
          <div className="main-content">
            <Routes>
              {/* Public routes only if not logged in */}
              <Route path="/" element={<PublicRoute element={<Home />} />} />
              <Route path="/login" element={<PublicRoute element={<Login />} />} />
              <Route path="/register" element={<PublicRoute element={<Register />} />} />

              {/* Protected routes after login */}
              <Route path="/customer" element={<ProtectedRoute element={<Customer />} />} />
              <Route path="/deposit" element={<ProtectedRoute element={<Deposit />} />} />
              <Route path="/withdraw" element={<ProtectedRoute element={<Withdraw />} />} />
              <Route path="/transfer" element={<ProtectedRoute element={<Transfer />} />} />
              <Route path="/transactions" element={<ProtectedRoute element={<Transactions />} />} />
            </Routes>
          </div>
          <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;
