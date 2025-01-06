import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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


interface RepaymentScheduleItem {
  id: number;
  month: number;
  dueDate: string;
  amount: number;
  status: string;
}

interface Document {
  id: number;
  name: string;
  url: string;
  type: string;
}

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

const mockRepaymentSchedule: RepaymentScheduleItem[] = [
  { id: 1, month: 1, dueDate: '2024-04-15', amount: 4500, status: 'PENDING' },
  { id: 2, month: 2, dueDate: '2024-05-15', amount: 4500, status: 'PENDING' },
  { id: 3, month: 3, dueDate: '2024-06-15', amount: 4500, status: 'PENDING' },
  { id: 4, month: 4, dueDate: '2024-07-15', amount: 4500, status: 'PENDING' },
];

const mockDocuments: Document[] = [
  { id: 1, name: 'Loan Agreement', url: '/documents/loan-agreement.pdf', type: 'APPLICATION' },
  { id: 2, name: 'Payment Schedule', url: '/documents/payment-schedule.pdf', type: 'PAYMENT' },
  { id: 3, name: 'Terms and Conditions', url: '/documents/terms.pdf', type: 'LEGAL' },
];

const LoanDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [repaymentSchedule, setRepaymentSchedule] = useState<RepaymentScheduleItem[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      if (!id) return;
      
      try {
        const response = await loanAPI.getLoanById(id);
        setLoan(response.data);
        // Set mock data for schedule and documents
        setRepaymentSchedule(mockRepaymentSchedule);
        setDocuments(mockDocuments);
      } catch (err) {
        console.error('Error fetching loan details:', err);
        setError('Failed to load loan details');
        setLoan(mockLoan);
        setRepaymentSchedule(mockRepaymentSchedule);
        setDocuments(mockDocuments);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLoanDetails();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
  }

  if (!loan) {
    return <div className="min-h-screen flex items-center justify-center">Loan not found</div>;
  }

  // Calculate derived values
  const totalInterest = (loan.amount * loan.interestRate * loan.tenure) / 1200;
  const totalAmount = loan.amount + totalInterest;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Loan Details</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium 
            ${loan.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              loan.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'}`}>
            {loan.status}
          </span>
        </div>

        {/* Loan Summary */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Loan Summary</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Loan Amount</p>
              <p className="font-medium">₦{loan.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="font-medium">{loan.tenure} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-medium">{loan.interestRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="font-medium">₦{loan.monthlyPayment?.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="font-medium">₦{totalInterest.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount Payable</p>
              <p className="font-medium">₦{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Important Dates</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Application Date</p>
              <p className="font-medium">{loan.appliedAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approval Date</p>
              <p className="font-medium">{loan.approvedAt}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Payment Date</p>
              <p className="font-medium">{loan.nextPaymentDate}</p>
            </div>
          </div>
        </div>

        {/* Repayment Schedule */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Repayment Schedule</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {repaymentSchedule.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₦{payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${payment.status === 'PAID' ? 'bg-green-100 text-green-800' :
                          payment.status === 'OVERDUE' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'}`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Documents</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">{doc.name}</span>
                  <a
                    href={doc.url}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Download
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;