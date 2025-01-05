import React from 'react'
import LoginForm from '../components/loginform.tsx'
import RegistrationForm from '../components/registrationform.tsx'
import { useState } from 'react'

const Homepage: React.FC = () => {
  const [showUserLogin, setShowUserLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Welcome to Fintech Loan Management
        </h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setShowUserLogin(true)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 
              ${showUserLogin
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Login
          </button>
          <button
            onClick={() => setShowUserLogin(false)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200
              ${!showUserLogin
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Register
          </button>
        </div>

        <div className="mt-6">
          {showUserLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
      </div>
    </div>
  )
}

export default Homepage