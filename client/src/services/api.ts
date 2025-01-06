import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  login: (data: any) => api.post('/users/', data),
  getCurrentUser: (id: string) => api.get(`/users/${id}`),
  getAllUsers: () => api.get('/users'),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
};

export const loanAPI = {
  getAllLoans: () => api.get('/loans'),
  getUserLoans: (userId: string) => api.get(`/loans/user/${userId}`),
  getLoanById: (id: string) => axios.get(`/loans/${id}`),
  createLoan: (data: any) => api.post('/loans', data),
  updateLoanStatus: (id: string, status: string) => 
    api.patch(`/loans/${id}/status`, { status }),
};

export const transactionAPI = {
  createTransaction: (data: any) => api.post('/transactions', data),
  getUserTransactions: (userId: string) => api.get(`/transactions/user/${userId}`),
  updateTransactionStatus: (id: string, status: string) => 
    api.patch(`/transactions/${id}/status`, { status }),
};
