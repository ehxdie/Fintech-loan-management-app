import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});



export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getCurrentUser: (id: string) => api.get(`/users/${id}`),
  updateUser: (id: string, data: any) => api.patch(`/users/user/{id}/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/admin/{id}/${id}`),
};

export const loanAPI = {
  createLoan: (data: any) => api.post('/loans', data),
  getAllLoans: () => api.get('/loans'),
  getLoanById: (id: string) => api.get(`/loans/${id}`),
  // Get loan by user id
  getUserLoans: (userId: string) => api.get(`/loans/user/${userId}`),
  updateLoanStatus: (id: string, status: string) =>  api.patch(`/loans/admin/${id}/status`,status),
  deleteLoan: (id: string) => api.delete(`/loans/admin/${id}`)
};

export const transactionAPI = {
  createTransaction: (data: any) => api.post('/transactions', data),
  getAllTransactions: () => api.get('/transactions'),
  getUserTransactionById: (id: string) => api.get(`/transactions/${id}`),
  // Get transaction by user id
  getUserTransactions: (userId: string) => api.get(`/transactions/user/${userId}`),
  updateTransactionStatus: (id: string, status: string) => api.patch(`/transactions/${id}/status`,status),
  deleteTransaction: (id: string) => api.delete(`/transactions/admin/${id}`)
};
