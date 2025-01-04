import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/homepage.tsx';
import Login from './pages/login.tsx';
import Register from './pages/registration.tsx';
import Dashboard from './pages/dashboard.tsx';
import LoanApplication from './pages/loanapplication.tsx';
import LoanDetails from './pages/loandetails.tsx';
import TransactionHistory from './pages/transactionhistory.tsx';
import Repayment from './pages/repayment.tsx';
import AdminDashboard from './pages/admindashboard.tsx';
import LoanReview from './pages/loanreview.tsx';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/loan-details/:id" element={<LoanDetails />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/repayment" element={<Repayment />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/loan-review/:id" element={<LoanReview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
