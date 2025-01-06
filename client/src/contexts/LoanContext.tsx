import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loanAPI } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface Loan {
  id: string;
  userId: string;
  amount: number;
  status: string;
  // ... other loan properties
}

interface LoanContextType {
  loans: Loan[];
  userLoans: Loan[];
  setLoans: (loans: Loan[]) => void;
  createLoan: (loanData: any) => Promise<void>;
  updateLoanStatus: (id: string, status: string) => Promise<void>;
  refreshLoans: () => Promise<void>;
}

const LoanContext = createContext<LoanContextType | undefined>(undefined);

export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const { user } = useAuth();

  const refreshLoans = async () => {
    if (user) {
      if (user?.id) {
        const response = await loanAPI.getUserLoans(user.id);
        setLoans(response.data);
      }
    }
  };

  const createLoan = async (loanData: any) => {
    await loanAPI.createLoan({ ...loanData, userId: user?.id });
    refreshLoans();
  };

  const updateLoanStatus = async (id: string, status: string) => {
    await loanAPI.updateLoanStatus(id, status);
    refreshLoans();
  };

  useEffect(() => {
    if (user) {
      refreshLoans();
    }
  }, [user]);

  const value = {
    loans,
    userLoans: loans.filter(loan => loan.userId === user?.id),
    setLoans,
    createLoan,
    updateLoanStatus,
    refreshLoans
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
