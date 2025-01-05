import React from 'react';
import { useParams } from 'react-router-dom';

interface LoanDetail {
  id: number;
  amount: number;
  tenure: number;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'PAID_OFF';
  applicationDate: string;
  approvalDate: string | null;
  interestRate: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  nextPaymentDate: string;
  remainingBalance: number;
  documents: Array<{
    id: number;
    name: string;
    url: string;
    type: string;
  }>;
  repaymentSchedule: Array<{
    id: number;
    month: number;
    dueDate: string;
    amount: number;
    status: 'PENDING' | 'PAID' | 'OVERDUE';
  }>;
}

const LoanDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Updated dummy data
  const loanData: LoanDetail = {
    id: 1,
    amount: 50000,
    tenure: 12,
    purpose: 'Business Expansion',
    status: 'ACTIVE',
    applicationDate: '2024-03-15',
    approvalDate: '2024-03-17',
    interestRate: 15,
    monthlyPayment: 4500,
    totalInterest: 4000,
    totalAmount: 54000,
    nextPaymentDate: '2024-04-15',
    remainingBalance: 50000,
    documents: [
      { id: 1, name: 'Loan Agreement', url: '/documents/loan-agreement.pdf', type: 'APPLICATION' },
      { id: 2, name: 'Payment Schedule', url: '/documents/payment-schedule.pdf', type: 'PAYMENT' }
    ],
    repaymentSchedule: [
      { id: 1, month: 1, dueDate: '2024-04-15', amount: 4500, status: 'PENDING' },
      { id: 2, month: 2, dueDate: '2024-05-15', amount: 4500, status: 'PENDING' },
      { id: 3, month: 3, dueDate: '2024-06-15', amount: 4500, status: 'PENDING' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Loan Details</h1>
          <span className={`px-4 py-2 rounded-full text-sm font-medium 
            ${loanData.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
              loanData.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'}`}>
            {loanData.status}
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
              <p className="font-medium">₦{loanData.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tenure</p>
              <p className="font-medium">{loanData.tenure} months</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Interest Rate</p>
              <p className="font-medium">{loanData.interestRate}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Payment</p>
              <p className="font-medium">₦{loanData.monthlyPayment.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Interest</p>
              <p className="font-medium">₦{loanData.totalInterest.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Amount Payable</p>
              <p className="font-medium">₦{loanData.totalAmount.toLocaleString()}</p>
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
              <p className="font-medium">{loanData.applicationDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Approval Date</p>
              <p className="font-medium">{loanData.approvalDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Next Payment Date</p>
              <p className="font-medium">{loanData.nextPaymentDate}</p>
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
                {loanData.repaymentSchedule.map((payment) => (
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
              {loanData.documents.map((doc) => (
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