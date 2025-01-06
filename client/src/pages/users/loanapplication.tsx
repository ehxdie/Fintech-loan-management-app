import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loanAPI } from '../../services/api';

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

interface LoanApplicationData {
  amount: number;
  tenure: number;
  purpose: string;
  employmentType: string;
  monthlyIncome: number;
  interestRate: number;
}

const LoanApplication: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<LoanApplicationData>({
    amount: 10000,
    tenure: 12,
    purpose: '',
    employmentType: '',
    monthlyIncome: 0,
    interestRate: 15
  });

  // Dynamic interest rate calculation
  const calculateInterest = () => {
    const baseRate = 15;
    const tenureAdjustment = formData.tenure > 12 ? 2 : 0;
    const amountAdjustment = formData.amount > 50000 ? -1 : 0;
    return baseRate + tenureAdjustment + amountAdjustment;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const loanData: Partial<Loan> = {
        amount: formData.amount,
        tenure: formData.tenure,
        purpose: formData.purpose,
        interestRate: calculateInterest(),
        status: 'PENDING',
        appliedAt: new Date().toISOString(),
        userId: 1, // Should come from auth context in real app
      };

      const response = await loanAPI.createLoan(loanData);
      toast.success('Loan application submitted successfully!');
      navigate(`/loan-details/${response.data.id}`);
    } catch (error) {
      console.error('Failed to submit loan application:', error);
      toast.error('Failed to submit loan application');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Loan Application</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* Loan Amount */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Loan Amount (₦)
            </label>
            <input
              type="range"
              min="10000"
              max="100000"
              step="5000"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
              className="w-full"
            />
            <div className="text-center text-xl font-bold text-blue-600">
              ₦{formData.amount.toLocaleString()}
            </div>
          </div>

          {/* Loan Tenure */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Loan Tenure (Months)
            </label>
            <select
              value={formData.tenure}
              onChange={(e) => setFormData({ ...formData, tenure: parseInt(e.target.value) })}
              className="w-full p-3 border rounded-lg"
            >
              <option value="6">6 Months</option>
              <option value="12">12 Months</option>
              <option value="24">24 Months</option>
              <option value="36">36 Months</option>
            </select>
          </div>

          {/* Loan Purpose */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Loan Purpose
            </label>
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Purpose</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="medical">Medical</option>
              <option value="personal">Personal</option>
            </select>
          </div>

          {/* Employment Type */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Employment Type
            </label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
              className="w-full p-3 border rounded-lg"
              required
            >
              <option value="">Select Employment Type</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self Employed</option>
              <option value="business">Business Owner</option>
            </select>
          </div>

          {/* Monthly Income */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Monthly Income (₦)
            </label>
            <input
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => setFormData({ ...formData, monthlyIncome: parseInt(e.target.value) })}
              className="w-full p-3 border rounded-lg"
              required
              min="0"
            />
          </div>

          {/* Interest Rate Display */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Interest Rate</p>
            <p className="text-2xl font-bold text-blue-600">{calculateInterest()}% p.a.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 
            focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200 
            disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;