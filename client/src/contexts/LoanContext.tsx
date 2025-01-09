import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loanAPI } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface Loan {
  id: number;
  userId: number;
  amount: number;
  tenure: number;
  interestRate: number;
  status: string;
  appliedAt: string;
  approvedAt?: string | null;
  repaidAt?: string | null;
  nextPaymentDate?: string | null;
  remainingBalance?: number | null;
  monthlyPayment?: number | null;
  purpose?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LoanContextType {
  loans: Loan[];
  userLoans: Loan[];
  error: string | null;
  setLoans: (loans: Loan[]) => void;
  createLoan: (loanData: Partial<Loan>) => Promise<void>;
  updateLoanStatus: (id: string, status: string) => Promise<void>;
  refreshLoans: () => Promise<void>;
  deleteLoan: (id: string) => Promise<void>;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshLoans = async () => {
    try {

      setError(null);
      if (user?.id) {
        const response = await loanAPI.getUserLoans(user.id);
        setLoans(response.data);
      }
    } catch (err) {
      setError('Failed to fetch loans');
      console.error('Error fetching loans:', err);
    } finally {

    }
  };

  const createLoan = async (loanData: Partial<Loan>) => {
    try {
      setError(null);
      await loanAPI.createLoan({ ...loanData, userId: user?.id });
      await refreshLoans();
    } catch (err) {
      setError('Failed to create loan');
      console.error('Error creating loan:', err);
      throw err;
    }
  };

  const updateLoanStatus = async (id: string, status: string) => {
    try {

      setError(null);
      await loanAPI.updateLoanStatus(id, status);
      await refreshLoans();
    } catch (err) {
      setError('Failed to update loan status');
      console.error('Error updating loan status:', err);
      throw err;
    }
  };

  const deleteLoan = async (id: string) => {
    try {

      setError(null);
      await loanAPI.deleteLoan(id);
      await refreshLoans();
    } catch (err) {
      setError('Failed to delete loan');
      console.error('Error deleting loan:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      refreshLoans();
    }
  }, [user]);

  const value: LoanContextType = {
    loans,
    userLoans: loans.filter(loan => loan.userId === Number(user?.id)),
    error,
    setLoans,
    createLoan,
    updateLoanStatus,
    refreshLoans,
    deleteLoan
  };

  return <LoanContext.Provider value={value}>{children}</LoanContext.Provider>;
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error('useLoan must be used within a LoanProvider');
  }
  return context;
};