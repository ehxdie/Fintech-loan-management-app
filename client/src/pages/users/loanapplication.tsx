import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface LoanApplication {
  amount: number;
  tenure: number;
  purpose: string;
  employmentType: string;
  monthlyIncome: number;
  existingLoans: boolean;
  interestRate: number;
}

const LoanApplication: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoanApplication>({
    amount: 10000,
    tenure: 12,
    purpose: '',
    employmentType: '',
    monthlyIncome: 0,
    existingLoans: false,
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
    try {
      // API call would go here
      toast.success('Loan application submitted successfully!');
      navigate('/loan-details/:id');
    } catch (error) {
      toast.error('Failed to submit loan application');
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
            className="w-full p-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 
            focus:ring-2 focus:ring-green-500 focus:outline-none transition-colors duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;