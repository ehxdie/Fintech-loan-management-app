import React, { useState, useEffect } from 'react';
import { loanAPI, transactionAPI } from '../../services/api.ts';

interface Loan {
  id: number;
  userId: number; // Assuming `User` is referenced by ID
  amount: number;
  tenure: number; // Loan tenure in months
  interestRate: number; // Interest rate as a percentage (e.g., 5.0 for 5%)
  status: string; // e.g., "PENDING", "APPROVED", "REPAID"
  appliedAt: string; // ISO string for LocalDateTime
  approvedAt?: string | null; // Nullable, ISO string for LocalDateTime
  repaidAt?: string | null; // Nullable, ISO string for LocalDateTime
  nextPaymentDate?: string | null; // Nullable, ISO string for LocalDateTime
  remainingBalance?: number | null; // Nullable
  monthlyPayment?: number | null; // Nullable
  purpose?: string | null; // Nullable, purpose of the loan
  createdAt: string; // ISO string for LocalDateTime
  updatedAt: string; // ISO string for LocalDateTime
}

export interface Transaction {
  id: number;
  userId: number; // Assuming `User` is referenced by ID
  loanId: number; // Assuming `Loan` is referenced by ID
  transactionType: string; // e.g., "DISBURSEMENT" or "REPAYMENT"
  amount: number;
  transactionDate: string; // ISO string format for LocalDateTime
  status: string; // e.g., "COMPLETED", "PENDING", or "FAILED"
  createdAt: string; // ISO string format for created timestamp
  updatedAt: string; // ISO string format for updated timestamp
}

// Mock data matching the interfaces
const mockLoan: Loan = {
  id: 1,
  userId: 1,
  amount: 50000,
  tenure: 12,
  interestRate: 15,
  status: 'APPROVED',
  appliedAt: new Date().toISOString(),
  approvedAt: new Date().toISOString(),
  repaidAt: null,
  nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  remainingBalance: 45000,
  monthlyPayment: 4500,
  purpose: 'Business Expansion',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const Repayment: React.FC = () => {
  const [loan, setLoan] = useState<Loan | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, you'd get the userId from auth context
        const userId = "1"; // placeholder
        const loansResponse = await loanAPI.getUserLoans(userId);
        const activeLoan = loansResponse.data[0]; // Assuming we want the first active loan
        
        if (activeLoan) {
          const transactionsResponse = await transactionAPI.getUserTransactions(userId);
          setLoan(activeLoan);
          setTransactions(transactionsResponse.data);
        } else {
          // Fallback to mock data
          setLoan(mockLoan);
          setTransactions([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load loan data');
        // Fallback to mock data
        setLoan(mockLoan);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!loan) {
    return <div className="min-h-screen flex items-center justify-center">No active loan found</div>;
  }

  const totalPaid = loan.amount - (loan.remainingBalance || 0);
  const progressPercentage = Math.round((totalPaid / loan.amount) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Repayment</h1>

        {/* Loan Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Total Loan Amount</h3>
            <p className="text-2xl font-bold text-gray-900">₦{loan.amount.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Remaining Balance</h3>
            <p className="text-2xl font-bold text-blue-600">₦{(loan.remainingBalance || 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Monthly Payment</h3>
            <p className="text-2xl font-bold text-green-600">₦{(loan.monthlyPayment || 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Next Payment Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-blue-800 font-medium">Next Payment Due</h3>
              <p className="text-blue-600 text-sm">
                ₦{(loan.monthlyPayment || 0).toLocaleString()} on {
                  new Date(loan.nextPaymentDate || '').toLocaleDateString()
                }
              </p>
            </div>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Make Payment
            </button>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Payment Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">₦{transaction.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${transaction.status === 'COMPLETED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Progress */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Repayment Progress</h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Total Paid</p>
                <p className="font-medium">₦{totalPaid.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Interest Rate</p>
                <p className="font-medium">{loan.interestRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repayment;