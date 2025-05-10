import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios';

export const UserRegister = ({}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const navigate = useNavigate();
    const { setUser } = React.useContext(UserDataContext);

  async function Submit(e) {
    e.preventDefault();

    const data = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password, 
    }
    
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, data, {
      withCredentials: true
    });

    if(response.status === 201) {
      const data = response.data;

      setUser(data.user);

      navigate('/home');
    }

    setEmail('');
    setPassword('');
    setfirstName('');
    setlastName('');
  }

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          {/* Logo */}
          <img
            className="w-16 mb-10"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYQy-OIkA6In0fTvVwZADPmFFibjmszu2A0g&s"
            alt="Logo"
          />

          <form onSubmit={Submit}>
            {/* Name Section */}
            <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
            <div className="flex gap-4 mb-7">
              <input
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value)
                }}
              />
              <input
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value)
                }}
              />
            </div>

            {/* Email Section */}
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              placeholder="email@example.com"
            />

            {/* Password Section */}
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />

            {/* Submit Button */}
            <button
              className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg"
              type="submit"
            >
              Create account
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center">
            Already have an account?{' '}
            <Link to="/userlogin" className="text-blue-600">
              Login here
            </Link>
          </p>
        </div>

        {/* Footer Disclaimer */}
        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{' '}
            <span className="underline">Google Privacy Policy</span> and{' '}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
