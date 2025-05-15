import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import CaptainContext from '../Context/CaptainContext';
import { CaptainDataContext } from '../Context/CaptainContext';
import axios from 'axios';

export const CaptainRegister = () => {

  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Color, setColor] = useState('');
  const [Plate, setPlate] = useState('');
  const [Capacity, setCapacity] = useState('');
  const [Type, setType] = useState('');

  // const { value } = React.useContext(CaptainDataContext);

  const navigate = useNavigate();

  async function Submit(e) {

    e.preventDefault();

    const data = {
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email: email,
        password: Password,
        vehicle: {
            color: Color,
            plate: Plate,
            capacity: Capacity,
            vehicleType: Type
        }
    }

    const response = await axios.post('http://localhost:4000/captains/register', data, {
      withCredentials: true
    });

      if(response.status === 201) {
          const data = response.data;
          // setUser(data.user);
          navigate('/captain-home');
    }

    setEmail('');
    setFirstname('');
    setLastname('');
    setColor('');
    setPassword('');
    setType('');
    setPlate('');
    setCapacity('');

  }

  return (
    <div className='py-1 px-5 flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-1' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form  onSubmit={Submit}>

          <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-2'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              Type="text"
              value={firstname}
              onChange={(e) => {setFirstname(e.target.value)}}
              placeholder='First name'
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              Type="text"
              value={lastname}
              onChange={(e) => {setLastname(e.target.value)}}
              placeholder='Last name'
            />
          </div>

          <h3 className='text-lg font-medium mb-1'>What's our Captain's email</h3>
          <input
            required
            className='bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            Type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)}}
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-1'>Enter Password</h3>
          <input
            required
            className='bg-[#eeeeee] mb-3 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={Password}
            onChange={(e) => {setPassword(e.target.value)}}
            type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              value={Color}
              onChange={(e) => {setColor(e.target.value)}}
              placeholder='Vehicle Color'
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              value={Plate}
              onChange={(e) => {setPlate(e.target.value)}}
              placeholder='Vehicle Plate'
            />
          </div>

          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              value={Capacity}
              onChange={(e) => {setCapacity(e.target.value)}}
              placeholder='Vehicle Capacity'
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={Type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>

        </form>

        <p className='text-center'>
          Already have a account? <Link to='/captainlogin' className='text-blue-600'>Login here</Link>
        </p>
      </div>

      <div>
        <p className='text-[10px] mt-3 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}
