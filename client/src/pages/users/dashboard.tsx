import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanAPI, transactionAPI } from '../../services/api.ts';
import axios from 'axios';

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

interface Transaction {
  id: number;
  userId: number;
  loanId: number;
  transactionType: string;
  amount: number;
  transactionDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loanSummaries, setLoanSummaries] = useState<Loan[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<string>('$0.00');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const mockLoans: Loan[] = [
    {
      id: 1,
      userId: 1,
      amount: 150000,
      tenure: 24,
      purpose: 'Home Improvement',
      status: 'ACTIVE',
      interestRate: 15,
      monthlyPayment: 7250,
      appliedAt: '2024-01-01T00:00:00Z',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
    {
      id: 2,
      userId: 1,
      amount: 20000,
      tenure: 12,
      purpose: 'Car Purchase',
      status: 'PAID_OFF',
      interestRate: 12,
      monthlyPayment: 1850,
      appliedAt: '2023-06-01T00:00:00Z',
      createdAt: '2023-06-01T00:00:00Z',
      updatedAt: '2023-06-01T00:00:00Z',
    },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: 1,
      userId: 1,
      loanId: 1,
      transactionType: 'REPAYMENT',
      amount: 7250,
      transactionDate: '2024-03-15T00:00:00Z',
      status: 'COMPLETED',
      createdAt: '2024-03-15T00:00:00Z',
      updatedAt: '2024-03-15T00:00:00Z',
    },
    {
      id: 2,
      userId: 1,
      loanId: 1,
      transactionType: 'DISBURSEMENT',
      amount: 150000,
      transactionDate: '2024-01-15T00:00:00Z',
      status: 'COMPLETED',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const [loanResponse, transactionResponse] = await Promise.all([
          loanAPI.getAllLoans(),
          transactionAPI.getUserTransactions('1'), // Replace with dynamic user ID if needed
        ]);

        setLoanSummaries(loanResponse.data || mockLoans);
        setTransactions(transactionResponse.data || mockTransactions);

        // Simulate balance calculation
        const totalBalance = loanResponse.data.reduce(
          (acc: number, loan: Loan) => acc + (loan.remainingBalance || 0),
          0
        );
        setBalance(`$${totalBalance.toFixed(2)}`);
      } catch (error) {
        console.error('Failed to fetch data from API:', error);
        setLoanSummaries(mockLoans);
        setTransactions(mockTransactions);
        setBalance('$8,450.75'); // Mock balance
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* Loan Summaries */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-700 mb-3">Loan Summaries</h2>
              <div className="space-y-4">
                {loanSummaries.map((loan) => (
                  <div key={loan.id} className="p-4 bg-white rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-800">{loan.purpose}</h3>
                    <p className="text-sm text-gray-500">Amount: ${loan.amount}</p>
                    <p className="text-sm text-gray-500">Tenure: {loan.tenure} months</p>
                    <p className="text-sm text-gray-500">Interest Rate: {loan.interestRate}%</p>
                    <p className="text-sm text-gray-500">Monthly Payment: ${loan.monthlyPayment}</p>
                    <p className={`text-sm ${loan.status === 'ACTIVE' ? 'text-blue-600' : 'text-green-600'}`}>
                      Status: {loan.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Balance */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-medium text-gray-700">Balance</h2>
              <p className="text-lg text-gray-800 mt-2">{balance}</p>
            </div>

            {/* Transactions */}
            <div className="mb-6">
              <h2 className="text-xl font-medium text-gray-700 mb-3">Transaction History</h2>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 bg-white rounded-lg shadow">
                    <p className="text-sm text-gray-800">Date: {transaction.transactionDate}</p>
                    <p className="text-sm text-gray-500">
                      Type: {transaction.transactionType}
                    </p>
                    <p className="text-sm text-gray-800 font-medium">Amount: ${transaction.amount}</p>
                    <p className={`text-sm ${transaction.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`}>
                      Status: {transaction.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Buttons */}
        <button
          onClick={() => navigate('/repayment')}
          className="w-full mb-4 p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
        >
          Repayment Status
        </button>

        <button
          onClick={() => navigate('/loan-application')}
          className="w-full mb-4 p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 
          focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200"
        >
          Apply for Loan
        </button>

        <button
          onClick={() => navigate('/transactions')}
          className="w-full p-4 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 
          focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-200"
        >
          View Transaction History
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
