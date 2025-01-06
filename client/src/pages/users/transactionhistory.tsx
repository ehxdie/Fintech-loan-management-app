import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Search, Calendar, Filter } from 'lucide-react';
import { loanAPI, transactionAPI } from '../../services/api.ts';
import { toast } from 'react-toastify';

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



const mockTransactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    loanId: 1,
    transactionType: 'DISBURSEMENT',
    amount: 50000,
    transactionDate: '2024-03-15T10:00:00Z',
    status: 'COMPLETED',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z'
  },
  {
    id: 2,
    userId: 1,
    loanId: 1,
    transactionType: 'REPAYMENT',
    amount: 4500,
    transactionDate: '2024-03-20T15:30:00Z',
    status: 'COMPLETED',
    createdAt: '2024-03-20T15:30:00Z',
    updatedAt: '2024-03-20T15:30:00Z'
  }
];

const TransactionHistory: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [transactionType, setTransactionType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Assuming we have the current user's ID stored somewhere
        const userId = '1'; // Replace with actual user ID
        const response = await transactionAPI.getUserTransactions(userId);
        setTransactions(response.data);
      } catch (err) {
        toast.error('Failed to fetch transactions. Using mock data instead.');
        setError('Failed to load transactions. Using mock data instead.');
        setTransactions(mockTransactions);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || transaction.transactionType === transactionType;
    const matchesSearch = transaction.id.toString().includes(searchQuery.toLowerCase()) ||
      transaction.loanId.toString().includes(searchQuery.toLowerCase());
    const matchesDateRange = (!startDate || !endDate) ? true :
      (new Date(transaction.transactionDate) >= startDate && new Date(transaction.transactionDate) <= endDate);

    return matchesType && matchesSearch && matchesDateRange;
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setTransactionType('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaction History</h1>

        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-2 border rounded-lg"
              />
            </div>

            {/* Date Range */}
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="w-full p-2 border rounded-lg"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Transaction Type */}
            <div>
              <select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
                className="w-full p-2 border rounded-lg"
              >
                <option value="all">All Types</option>
                <option value="DISBURSEMENT">Disbursement</option>
                <option value="REPAYMENT">Repayment</option>
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading transactions...</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Loan ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {format(new Date(transaction.transactionDate), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">#{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">#{transaction.loanId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${transaction.transactionType === 'DISBURSEMENT' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {transaction.transactionType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={transaction.transactionType === 'DISBURSEMENT' ? 'text-green-600' : 'text-red-600'}>
                        ₦{transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!isLoading && (
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;