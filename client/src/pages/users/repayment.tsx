import React from 'react';

const Repayment: React.FC = () => {
  // Dummy data - would come from API
  const loanDetails = {
    loanId: 'L123456',
    totalAmount: 50000,
    remainingBalance: 45000,
    monthlyPayment: 4500,
    nextPaymentDate: '2024-04-15',
    interestRate: '15%',
    totalPaid: 5000,
    status: 'ACTIVE'
  };

  const paymentSchedule = [
    { id: 1, dueDate: '2024-04-15', amount: 4500, status: 'PENDING' },
    { id: 2, dueDate: '2024-03-15', amount: 4500, status: 'PAID' },
    { id: 3, dueDate: '2024-02-15', amount: 4500, status: 'PAID' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Loan Repayment</h1>

        {/* Loan Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Total Loan Amount</h3>
            <p className="text-2xl font-bold text-gray-900">₦{loanDetails.totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Remaining Balance</h3>
            <p className="text-2xl font-bold text-blue-600">₦{loanDetails.remainingBalance.toLocaleString()}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-sm text-gray-500 mb-2">Monthly Payment</h3>
            <p className="text-2xl font-bold text-green-600">₦{loanDetails.monthlyPayment.toLocaleString()}</p>
          </div>
        </div>

        {/* Next Payment Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-blue-800 font-medium">Next Payment Due</h3>
              <p className="text-blue-600 text-sm">
                ₦{loanDetails.monthlyPayment.toLocaleString()} on {loanDetails.nextPaymentDate}
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
                {paymentSchedule.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{payment.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">₦{payment.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${payment.status === 'PAID'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'}`}
                      >
                        {payment.status}
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
                <span>{Math.round((loanDetails.totalPaid / loanDetails.totalAmount) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(loanDetails.totalPaid / loanDetails.totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Total Paid</p>
                <p className="font-medium">₦{loanDetails.totalPaid.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Interest Rate</p>
                <p className="font-medium">{loanDetails.interestRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Repayment;