import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { transactionAPI } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface Transaction {
  id: number;
  userId: number; // ID of the user
  loanId: number; // ID of the associated loan
  transactionType: string; // e.g., "DISBURSEMENT" or "REPAYMENT"
  amount: number;
  transactionDate: string; // ISO string format
  status: string; // e.g., "COMPLETED", "PENDING", or "FAILED"
  createdAt: string;
  updatedAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  error: string | null;
  setTransactions: (transactions: Transaction[]) => void;
  createTransaction: (transactionData: Partial<Transaction>) => Promise<void>;
  updateTransactionStatus: (id: string, status: string) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshTransactions = async () => {
    try {
      setError(null);
      if (user?.id) {
        const response = await transactionAPI.getUserTransactions(user.id);
        setTransactions(response.data);
      }
    } catch (err) {
      setError('Failed to fetch transactions');
      console.error('Error fetching transactions:', err);
    }
  };

  const createTransaction = async (transactionData: Partial<Transaction>) => {
    try {
      setError(null);
      await transactionAPI.createTransaction({ ...transactionData, userId: user?.id });
      await refreshTransactions();
    } catch (err) {
      setError('Failed to create transaction');
      console.error('Error creating transaction:', err);
      throw err;
    }
  };

  const updateTransactionStatus = async (id: string, status: string) => {
    try {
      setError(null);
      await transactionAPI.updateTransactionStatus(id, status);
      await refreshTransactions();
    } catch (err) {
      setError('Failed to update transaction status');
      console.error('Error updating transaction status:', err);
      throw err;
    }
  };

  const deleteTransaction = async (id: string) => {
    try {
      setError(null);
      await transactionAPI.deleteTransaction(id);
      await refreshTransactions();
    } catch (err) {
      setError('Failed to delete transaction');
      console.error('Error deleting transaction:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      refreshTransactions();
    }
  }, [user]);

  const value: TransactionContextType = {
    transactions,
    error,
    setTransactions,
    createTransaction,
    updateTransactionStatus,
    refreshTransactions,
    deleteTransaction,
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
