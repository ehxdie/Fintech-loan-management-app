import axios from 'axios';


const API_URL = 'http://localhost:8080/api'; // Base API URL


type User = {
    name: string;
    email: string;
    roles: string | null;
};

export let user: User = { name: '', email: '', roles: null };

export const loginUser = async (credentials: { email: string; password: string }) => {

    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        const { name, email, roles } = response.data;
        user = { name, email, roles };
        console.log('Logged in user:', user);
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
    roles: string;
}) => {
    try {
        const response = await axios.post(`${API_URL}/users/register`, userData);
        console.log(userData);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
        throw error;
    }
};
