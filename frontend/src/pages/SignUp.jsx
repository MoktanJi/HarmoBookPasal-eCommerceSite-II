import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {
  const [Values, setValues] = useState({
     username: "", 
     email: "", 
     password: "", 
     address: "",
    })
    const navigate = useNavigate();
    const change = (e) => {
      const { name, value } = e.target;
      setValues({ ...Values, [name]: value })
    }
    const submit = async () => {
      try{
        if(Values.username === "" || Values.email === "" || Values.password === "" || Values.address === "")
        {
          alert("All fields are required.")
        }else{
          const response = await axios.post("http://localhost:1000/ap1/v1/sign-up", Values)
          alert(response.data.message)
          navigate("/SignIn")
        }
      }catch(error){
        alert(error.response.data.message)
      }
    }
    return (
      <div className='h-screen bg-gray-100 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
          <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Sign Up</h2>
          <form className='space-y-4'>
            <div>
              <label htmlFor='username' className='block text-gray-700 font-semibold mb-1'>
                Username
              </label>
              <input 
                type='text'
                id='username'
                name='username'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                placeholder='Enter your username'
                value={Values.username}
                onChange={change}
                required 
              />
            </div>
            <div>
              <label htmlFor='email' className='block text-gray-700 font-semibold mb-1'>
                Email
              </label>
              <input 
                type='email'
                id='email'
                name='email'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                placeholder='Enter your email'
                value={Values.email}
                onChange={change}
                required
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-gray-700 font-semibold mb-1'>
                Password
              </label>
              <input 
                type='password'
                id='password'
                name='password'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                placeholder='Enter your password'
                value={Values.password}
                onChange={change}
                required
              />
            </div>
            <div>
              <label htmlFor='address' className='block text-gray-700 font-semibold mb-1'>
                Address
              </label>
              <textarea 
                id='address'
                name='address'
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
                rows='5'
                placeholder='Enter your address'
                value={Values.address}
                onChange={change}
                required
              /> 
            </div>
            <button 
              type='button'
              className='w-full py-3 bg-yellow-900 text-white font-semibold rounded-lg hover:bg-yellow-800 transition duration-300'
              onClick={submit}
            >
              Sign Up
            </button>
          </form>
          <div className='mt-6 text-center'>
            <p className='text-gray-600'>Or</p>
            <p className='mt-4 text-gray-700'>
              Already have an account? 
              <Link to='/SignIn' className='text-yellow-900 font-semibold hover:underline'>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
}



export default SignUp