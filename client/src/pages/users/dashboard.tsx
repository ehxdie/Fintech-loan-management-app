import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Loan {
  id: number;
  amount: number;
  tenure: number;
  purpose: string;
  status: 'ACTIVE' | 'PAID_OFF' | 'PENDING';
  interestRate: number;
  monthlyPayment: number;
  disbursementDate: string;
}

interface Transaction {
  id: number;
  type: 'REPAYMENT' | 'DISBURSEMENT';
  amount: number;
  description: string;
  transactionDate: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Updated dummy data matching database schema
  const loanSummaries: Loan[] = [
    {
      id: 1,
      amount: 150000,
      tenure: 24,
      purpose: 'Home Improvement',
      status: 'ACTIVE',
      interestRate: 15,
      monthlyPayment: 7250,
      disbursementDate: '2024-01-15'
    },
    {
      id: 2,
      amount: 20000,
      tenure: 12,
      purpose: 'Car Purchase',
      status: 'PAID_OFF',
      interestRate: 12,
      monthlyPayment: 1850,
      disbursementDate: '2023-06-01'
    }
  ];

  const balance = '$8,450.75';

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'REPAYMENT',
      amount: 7250,
      description: 'Monthly Loan Repayment',
      transactionDate: '2024-03-15',
      status: 'COMPLETED'
    },
    {
      id: 2,
      type: 'DISBURSEMENT',
      amount: 150000,
      description: 'Loan Disbursement',
      transactionDate: '2024-01-15',
      status: 'COMPLETED'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h1>

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
                <p className="text-sm text-gray-500">Disbursement Date: {loan.disbursementDate}</p>
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

        {/* Repayment Status Button */}
        <button
          onClick={() => navigate('/repayment')}
          className="w-full mb-4 p-4 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 
          focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-200"
        >
          Repayment Status
        </button>

        {/* Loan Application Button */}
        <button
          onClick={() => navigate('/loan-application')}
          className="w-full mb-4 p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 
          focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200"
        >
          Apply for Loan
        </button>

        {/* Transactions */}
        <div className="mb-6">
          <h2 className="text-xl font-medium text-gray-700 mb-3">Transaction History</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 bg-white rounded-lg shadow">
                <p className="text-sm text-gray-800">Date: {transaction.transactionDate}</p>
                <p className="text-sm text-gray-500">Description: {transaction.description}</p>
                <p className="text-sm text-gray-800 font-medium">Amount: ${transaction.amount}</p>
                <p className={`text-sm ${transaction.status === 'COMPLETED' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {transaction.status}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* View Transactions Button */}
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
