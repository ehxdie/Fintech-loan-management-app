import React from 'react'
import LoginForm from '../components/loginform.tsx';
import RegistrationForm from '../components/registrationform.tsx';
import { useState } from 'react';


const Homepage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="homepage">
      <div className="auth-container">
        <h1>Welcome to Fintech Loan Management</h1>
        <div className="toggle-buttons">
          <button onClick={() => setShowLogin(true)} className={showLogin ? 'active' : ''}>
            Login
          </button>
          <button onClick={() => setShowLogin(false)} className={!showLogin ? 'active' : ''}>
            Register
          </button>
        </div>
        {showLogin ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
  
}

export default Homepage