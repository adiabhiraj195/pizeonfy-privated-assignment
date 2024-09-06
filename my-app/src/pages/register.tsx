import React, { useState, FormEvent } from 'react';
import useToast from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/user-service';
import axios from 'axios';

const Register: React.FC = () => {
  const [userName, setuserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { toastWarning, toastError } = useToast();
  const navigate = useNavigate();

  const validateData: () => boolean = () => {
    let isValid: boolean = true;


    if (!(userName.length >= 4 && password.length <= 24)) {
      isValid = false;
      toastWarning('Username length must be in range 4 to 24!');
      return isValid;
    }
    if (!(password.length >= 8 && password.length <= 25)) {
      isValid = false;
      toastWarning('Password length must be in range 8 to 25!');
      return isValid;
    }
    if (password !== confirmPassword) {
      isValid = false;
      toastWarning('Passwords are not matching');
      return isValid;
    }
    return isValid;
  }

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateData()) return

    try {
      const response = await UserService.register({
        userName,
        password
      });
      console.log(response);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        if (response?.data.error.length > 0) {
          toastError(response?.data.error);
        } else {
          toastError('An unknown error has occurred. Please try again');
        }
      } else {
        toastError('An unknown error has occurred. Please try again');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-lg w-full bg-gray-800 rounded-lg p-12 shadow-xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Register Account</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-6">
            <label htmlFor="userName" className="block text-lg font-medium text-gray-400">
              Username
            </label>
            <input
              id="userName"
              type="userName"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="mt-3 block w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="too_old"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg font-medium text-gray-400">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 block w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="mb-8">
            <label htmlFor="password" className="block text-lg font-medium text-gray-400">
              Confirm Password
            </label>
            <input
              id="password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-3 block w-full px-5 py-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;