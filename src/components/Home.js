import React, { useState } from "react";
import '../css/Home.css';
import Login from "./Login";
import Register from "./Register"; // Assuming you have a Register component

const Home = () => {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="home-container">
            <div className="left-section">
                <h2>Welcome to the</h2>
                <h2>Online Banking Application</h2>
                <p>Experience the convenience of banking at your fingertips.</p>
            </div>

            <div className="right-section">
                {!showSignup ? (
                    <>
                        <Login />
                        <p className="signup-text">
                            New user? <span onClick={() => setShowSignup(true)} className="signup-link">Sign Up</span>
                        </p>
                    </>
                ) : (
                    <>
                        <Register />
                        <p className="signup-text">
                            Already have an account? <span onClick={() => setShowSignup(false)} className="signup-link">Login</span>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
