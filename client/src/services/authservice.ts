import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Base API URL


export const loginUser = async (credentials: { email: string; password: string  }) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    

    return response;
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
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
        throw error;
    }
};
