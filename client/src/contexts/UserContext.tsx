import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { userAPI } from '../services/api.ts';
import { useAuth } from './AuthContext.tsx';

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string;
  roles: string;
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  users: User[];
  currentUser: User | null;
  error: string | null;
  setUsers: (users: User[]) => void;
  findByEmail: (email: string) => Promise<User>;
  getUserById: (id: string) => Promise<void>;
  updateUser: (id: string, userData: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const refreshUsers = async () => {
    try {
      setError(null);
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    }
  };

  const findByEmail = async (email: string) => {
    try {
      setError(null);
      const response = await userAPI.getUserByEmail(email);
      return response.data;
    } catch (err) {
      setError('Failed to find user by email');
      throw err;
    }
  };

  const getUserById = async (id: string) => {
    try {
      setError(null);
      const response = await userAPI.getCurrentUser(id);
      setCurrentUser(response.data);
    } catch (err) {
      setError('Failed to fetch user');
      throw err;
    }
  };

  const updateUser = async (id: string, userData: Partial<User>) => {
    try {
      setError(null);
      await userAPI.updateUser(id, userData);
      await refreshUsers();
    } catch (err) {
      setError('Failed to update user');
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setError(null);
      await userAPI.deleteUser(id);
      await refreshUsers();
    } catch (err) {
      setError('Failed to delete user');
      throw err;
    }
  };

  useEffect(() => {
    if (user) {
      refreshUsers();
    }
  }, [user]);

  const value: UserContextType = {
    users,
    currentUser,
    error,
    setUsers,
    findByEmail,
    getUserById,
    updateUser,
    deleteUser,
    refreshUsers,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
