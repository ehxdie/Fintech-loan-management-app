import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './pages/homepage.tsx';
import Dashboard from './pages/users/dashboard.tsx';
import LoanApplication from './pages/users/loanapplication.tsx';
import LoanDetails from './pages/users/loandetails.tsx';
import TransactionHistory from './pages/users/transactionhistory.tsx';
import Repayment from './pages/users/repayment.tsx';
import AdminDashboard from './pages/admin/admindashboard.tsx';
import LoanReview from './pages/admin/loanreview.tsx';
import LoginForm from './components/loginform.tsx';
import RegistrationForm from './components/registrationform.tsx';
import UserLoans from './pages/admin/userloans.tsx';
import Header from './components/header.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { LoanProvider } from './contexts/LoanContext.tsx';
import { TransactionProvider } from './contexts/TransactionContext.tsx';
import { UserProvider } from './contexts/UserContext.tsx';

const App: React.FC = () => {
  return (
  <AuthProvider>
    <LoanProvider>
      <TransactionProvider>
        <UserProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/loan-application" element={<LoanApplication />} />
                  <Route path="/loan-details/:id" element={<LoanDetails />} />
                  <Route path="/transactions" element={<TransactionHistory />} />
                  <Route path="/repayment" element={<Repayment />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/loan-review/:id" element={<LoanReview />} />
                  <Route path="/admin/userloans" element={<UserLoans />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/register" element={<RegistrationForm />} />
                </Routes>
              </main>
            </div>
          </BrowserRouter>
        </UserProvider>
      </TransactionProvider>
    </LoanProvider>
  </AuthProvider>
  );
};

export default App;
