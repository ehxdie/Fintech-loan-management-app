import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Replace with your backend endpoint

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};
