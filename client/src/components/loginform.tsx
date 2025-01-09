import React, { useState } from 'react';
import { loginUser } from '../services/authservice.ts';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      toast.success('Login Successful!', response);


      if (response.roles == 'Admin') {
        navigate("/admin");
      } else if (response.roles == 'User') {
        navigate("/dashboard");
      } else {
        alert('Role not recognized. Please contact support.');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                placeholder-gray-400 text-gray-900"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
            shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            transition-colors duration-200"
        >
          Sign in
        </button>

        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">
            No Account?{' '}
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium" onClick={() => navigate("/register")}>
              Register
            </span>
          </div>
          <div className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium">
            Forgot password?
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;