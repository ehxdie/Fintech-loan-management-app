import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { loanAPI } from '../../services/api.ts';

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

const mockLoans: Loan[] = [
    {
        id: 1,
        userId: 101,
        amount: 50000,
        tenure: 12,
        interestRate: 5,
        status: 'PENDING',
        appliedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 2,
        userId: 102,
        amount: 100000,
        tenure: 24,
        interestRate: 7.5,
        status: 'APPROVED',
        appliedAt: new Date().toISOString(),
        approvedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

const UserLoans: React.FC = () => {
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [loans, setLoans] = useState<Loan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await loanAPI.getAllLoans();
                setLoans(response.data as Loan[]);
            } catch (err) {
                setError('Failed to fetch loans. Showing mock data.');
                setLoans(mockLoans); // Use mock data if API call fails
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const filteredLoans = loans.filter(loan => {
        const matchesStatus = statusFilter === 'all' || loan.status === statusFilter;
        const matchesSearch =
            loan.id.toString().includes(searchQuery) ||
            loan.purpose?.toLowerCase().includes(searchQuery.toLowerCase() || '');
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil(filteredLoans.length / itemsPerPage);
    const currentLoans = filteredLoans.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Applications</h1>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="p-4 flex items-center space-x-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by loan ID or purpose..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-full p-2 border rounded-lg"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="p-2 border rounded-lg min-w-[150px]"
                        >
                            <option value="all">All Status</option>
                            <option value="PENDING">Pending</option>
                            <option value="APPROVED">Approved</option>
                            <option value="REJECTED">Rejected</option>
                        </select>
                    </div>
                </div>

                {/* Loans Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Purpose</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {currentLoans.map((loan) => (
                                <tr key={loan.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">₦{loan.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">{loan.purpose || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{loan.appliedAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${loan.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                                loan.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {loan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            onClick={() => navigate(`/admin/loan-review/${loan.id}`)}
                                            className="text-blue-600 hover:text-blue-900"
                                        >
                                            Review
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredLoans.length)} of {filteredLoans.length} results
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
            </div>
        </div>
    );
};

export default UserLoans;
