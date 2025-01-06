import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const API_URL = 'http://localhost:8080/api'; // Base API URL

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
        throw error;
    }
};

export const registerUser = async (userData: {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
        throw error;
    }
};
