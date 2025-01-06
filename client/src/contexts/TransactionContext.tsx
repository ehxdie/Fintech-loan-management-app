import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { transactionAPI } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface Transaction {
  id: string;
  userId: string;
  loanId: string;
  amount: number;
  status: string;
  // ... other transaction properties
}

interface TransactionContextType {
  transactions: Transaction[];
  createTransaction: (transactionData: any) => Promise<void>;
  updateTransactionStatus: (id: string, status: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { user } = useAuth();

  const refreshTransactions = async () => {
    if (user) {
      const response = await transactionAPI.getUserTransactions(user.id!);
      setTransactions(response.data);
    }
  };

  const createTransaction = async (transactionData: any) => {
    await transactionAPI.createTransaction(transactionData);
    refreshTransactions();
  };

  const updateTransactionStatus = async (id: string, status: string) => {
    await transactionAPI.updateTransactionStatus(id, status);
    refreshTransactions();
  };

  useEffect(() => {
    if (user) {
      refreshTransactions();
    }
  }, [user]);

  const value = {
    transactions,
    createTransaction,
    updateTransactionStatus,
    refreshTransactions
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

export const useTransaction = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
};
