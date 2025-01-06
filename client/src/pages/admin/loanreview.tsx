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



const LoanReview: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reviewNote, setReviewNote] = useState('');
  const [loanApplication, setLoanApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        if (!id) return;
        const response = await loanAPI.getLoanById(id);
        setLoanApplication(response.data);
      } catch (err) {
        setError('Failed to fetch loan details');
        console.error(err);
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
  if (error) return <div>Error: {error}</div>;
  if (!loanApplication) return <div>No loan data found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Loan Application Review</h1>
          <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            Pending Review
          </span>
        </div>

        {/* Applicant Information */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Applicant Information</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{loanApplication.applicant.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{loanApplication.applicant.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{loanApplication.applicant.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Income</p>
              <p className="font-medium">${loanApplication.applicant.monthlyIncome}</p>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Loan Details</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Amount Requested</p>
              <p className="font-medium">${loanApplication.loanDetails.amount}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="font-medium">{loanApplication.loanDetails.tenure} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Purpose</p>
              <p className="font-medium">{loanApplication.loanDetails.purpose}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-medium">{loanApplication.loanDetails.interestRate}%</p>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Risk Assessment</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Credit Score</p>
                <p className="text-2xl font-bold text-blue-600">
                  {loanApplication.applicant.creditScore}
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Debt-to-Income</p>
                <p className="text-2xl font-bold text-green-600">
                  {loanApplication.riskMetrics.debtToIncome}%
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Risk Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {loanApplication.riskMetrics.riskScore}
                </p>
              </div>
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
      </div>
    </div>
  );
};

export default LoanReview;