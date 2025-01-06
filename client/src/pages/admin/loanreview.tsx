import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loanAPI } from '../../services/api.ts';

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

// Mock data
const mockLoan: Loan = {
  id: 1,
  userId: 1,
  amount: 50000,
  tenure: 12,
  interestRate: 15.0,
  status: 'PENDING',
  appliedAt: new Date().toISOString(),
  approvedAt: null,
  repaidAt: null,
  nextPaymentDate: null,
  remainingBalance: 50000,
  monthlyPayment: 4500,
  purpose: 'Business Expansion',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const LoanReview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewNote, setReviewNote] = useState('');
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        if (!id) return;
        const response = await loanAPI.getLoanById(id);
        setLoan(response.data);
      } catch (err) {
        console.error('Error fetching loan:', err);
        setError('Using mock data - API call failed');
        setLoan(mockLoan);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  const handleStatusUpdate = async (status: 'APPROVED' | 'REJECTED') => {
    try {
      if (!id) return;
      await loanAPI.updateLoanStatus(id, status);
      toast.success(`Loan ${status.toLowerCase()}`);
      navigate('/admin/userloans');
    } catch (err) {
      toast.error('Failed to update loan status');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!loan) return <div>No loan data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Loan Application Review</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${loan.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
              loan.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
            }`}>
            {loan.status}
          </span>
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Loan Details</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Amount Requested</p>
              <p className="font-medium">₦{loan.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="font-medium">{loan.tenure} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Purpose</p>
              <p className="font-medium">{loan.purpose || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-medium">{loan.interestRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="font-medium">₦{loan.monthlyPayment?.toLocaleString() || 'Calculating...'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Application Date</p>
              <p className="font-medium">{new Date(loan.appliedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Review Notes */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Review Notes</h2>
            <textarea
              className="w-full p-3 border rounded-lg"
              rows={4}
              value={reviewNote}
              onChange={(e) => setReviewNote(e.target.value)}
              placeholder="Add your review notes here..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        {loan.status === 'PENDING' && (
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => handleStatusUpdate('REJECTED')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Reject Application
            </button>
            <button
              onClick={() => handleStatusUpdate('APPROVED')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Approve Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanReview;