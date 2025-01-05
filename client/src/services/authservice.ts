import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; // Replace with your backend endpoint


export const loginUser = async (credentials: { email: string; password: string  }) => {
    //const response = await axios.post(`${API_URL}/login`, credentials);
    const response = {...credentials, roles:"Admin"};

    return response;
};

export const registerUser = async (data: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data;
};
