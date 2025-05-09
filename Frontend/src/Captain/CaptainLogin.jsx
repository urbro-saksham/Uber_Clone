import React, { useState } from 'react';

import { Link } from 'react-router-dom';

export const CaptainLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});

    function Submit(e) {
      e.preventDefault();
      setCaptainData({
        email:email,
        password:password,
      });
      setEmail('');
      setPassword('');
    };

  return (
    <div className="w-full min-h-screen flex flex-col justify-between px-6 py-10 bg-white">
      
      {/* Title */}
      <form onSubmit={Submit}>
        <h1 className="text-3xl font-bold mb-8">Sign in as Captain</h1>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
          <Link to="/captainregister" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Sign in as Captain */}
      <div className="text-center mt-12 text-sm text-gray-600">
        <Link to="/userlogin" className="hover:underline">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};
