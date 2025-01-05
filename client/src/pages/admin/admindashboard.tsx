import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

interface Loan {
  id: number;
  userId: number;
  amount: number;
  tenure: number;
  purpose: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  applicationDate: string;
  interestRate: number;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate()

  // Dummy data for admin dashboard
  const stats = {
    totalLoans: 150,
    pendingApprovals: 25,
    totalDisbursed: '$2,500,000',
    repaymentRate: '85%'
  }

  const pendingLoans: Loan[] = [
    {
      id: 1,
      userId: 1,
      amount: 50000,
      tenure: 12,
      purpose: 'Business Expansion',
      status: 'PENDING',
      applicationDate: '2024-03-15',
      interestRate: 15
    },
    {
      id: 2,
      userId: 2,
      amount: 25000,
      tenure: 6,
      purpose: 'Equipment Purchase',
      status: 'PENDING',
      applicationDate: '2024-03-14',
      interestRate: 12
    }
  ]

  const recentDisbursements = [
    {
      id: 1,
      userId: 3,
      amount: 35000,
      disbursementDate: '2024-03-13',
      status: 'DISBURSED',
      transactionId: 'TRX123'
    },
    {
      id: 2,
      userId: 4,
      amount: 45000,
      disbursementDate: '2024-03-12',
      status: 'DISBURSED',
      transactionId: 'TRX124'
    }
  ]

  const repaymentData = [
    { month: 'Jan', onTime: 85, late: 15 },
    { month: 'Feb', onTime: 90, late: 10 },
    { month: 'Mar', onTime: 88, late: 12 }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Loans</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalLoans}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Pending Approvals</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingApprovals}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Total Disbursed</h3>
            <p className="text-3xl font-bold text-green-600">{stats.totalDisbursed}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500 text-sm">Repayment Rate</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.repaymentRate}</p>
          </div>
        </div>

        {/* Pending Loans Section */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Pending Loan Applications</h2>
          </div>
          <div className="p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500">
                  <th className="pb-4">Applicant</th>
                  <th className="pb-4">Amount</th>
                  <th className="pb-4">Tenure</th>
                  <th className="pb-4">Applied Date</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingLoans.map(loan => (
                  <tr key={loan.id} className="border-t">
                    <td className="py-4">{loan.userId}</td>
                    <td className="py-4">${loan.amount}</td>
                    <td className="py-4">{loan.tenure} months</td>
                    <td className="py-4">{loan.applicationDate}</td>
                    <td className="py-4">
                      <button
                        onClick={() => navigate(`/admin/loan-review/${loan.id}`)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Repayment Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Repayment Trends</h2>
          <BarChart width={800} height={300} data={repaymentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="onTime" fill="#10B981" name="On Time" />
            <Bar dataKey="late" fill="#EF4444" name="Late" />
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard