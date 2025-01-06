import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { loanAPI, transactionAPI } from '../../services/api.ts';

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
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalLoans: 0,
    pendingApprovals: 0,
    totalDisbursed: '0',
    repaymentRate: '0%'
  });
  const [pendingLoans, setPendingLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [loansResponse] = await Promise.all([
          loanAPI.getAllLoans()
        ]);

        const loans = loansResponse.data;
        const pendingLoans = loans.filter(loan => loan.status === 'PENDING');
        const approvedLoans = loans.filter(loan => loan.status === 'APPROVED');
        
        setStats({
          totalLoans: loans.length,
          pendingApprovals: pendingLoans.length,
          totalDisbursed: `$${approvedLoans.reduce((sum, loan) => sum + loan.amount, 0).toLocaleString()}`,
          repaymentRate: '85%' // This would ideally come from a specific API endpoint
        });
        
        setPendingLoans(pendingLoans);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const repaymentData = [
    { month: 'Jan', onTime: 4000, late: 2400 },
    { month: 'Feb', onTime: 3000, late: 1398 },
    { month: 'Mar', onTime: 2000, late: 9800 },
    { month: 'Apr', onTime: 2780, late: 3908 },
    { month: 'May', onTime: 1890, late: 4800 },
    { month: 'Jun', onTime: 2390, late: 3800 },
    { month: 'Jul', onTime: 3490, late: 4300 },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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