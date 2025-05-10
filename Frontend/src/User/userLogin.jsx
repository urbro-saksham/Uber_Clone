import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../Context/UserContext';

export const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  async function Submit(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }

    const data = { email, password };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/login`, data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        navigate('/home');
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col justify-between px-6 py-10 bg-white">
      <form onSubmit={Submit}>
        <h1 className="text-3xl font-bold mb-8">Sign in to your account</h1>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Enter your password"
          />
        </div>

        {/* Login Button */}
        <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium mb-4">
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm">
          New user?{' '}
          <Link to="/userregister" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Sign in as Captain */}
      <div className="text-center mt-12 text-sm text-gray-600">
        <Link to="/captainlogin" className="hover:underline">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};
