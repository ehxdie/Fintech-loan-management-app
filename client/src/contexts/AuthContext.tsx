import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { userAPI } from '../services/api.ts';
import { loginUser, registerUser } from '../services/authservice.ts';


interface AuthUser {
    id?: string;
    name: string;
    email: string;
    roles: string | null;
}

interface AuthContextType {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: RegisterData) => Promise<void>;
    logout: () => void;
    getCurrentUser: () => Promise<void>;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    phoneNumber?: string;
    roles: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginUser({ email, password });
            setUser(response);
            setIsAuthenticated(true);
            console.log('Login successful:', response);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            const response = await registerUser(userData); 
            console.log('User registered:', response);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Registration failed:', error.response?.data?.message || 'Unknown error');
                throw new Error(error.response?.data?.message || 'Registration failed');
            }
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        console.log('User logged out');
    };

    const getCurrentUser = async () => {
        try {
            const response = await userAPI.getCurrentUser(user?.id || '');
            setUser(response.data);
            setIsAuthenticated(true);
            console.log('Fetched current user:', response.data);
        } catch (error) {
            console.error('Failed to fetch current user:', error);
            logout();
        }
    };

    useEffect(() => {
        // Automatically fetch user details if already authenticated (e.g., from a stored session)
        if (!user && isAuthenticated) {
            getCurrentUser();
        }
    }, [isAuthenticated]);

    const value = {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        getCurrentUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
