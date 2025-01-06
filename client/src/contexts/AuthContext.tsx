import React, { createContext, useContext, useState, ReactNode } from 'react';
import { userAPI } from '../services/api.ts';

interface AuthUser {
    id?: string;
    name?: string;
    email: string;
    role?: string;
}

interface AuthContextType {
    user: AuthUser | null;
    setUser: (user: AuthUser | null) => void;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const response = await userAPI.login({ email, password });
            const { user } = response.data;
            setUser(user);
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
    };

    const value = {
        user,
        setUser,
        isAuthenticated: !!user,
        login,
        logout
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