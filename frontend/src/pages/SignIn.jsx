import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { authActions } from '../store/auth'
import { useDispatch } from 'react-redux'

const SignIn = () => {
  const [Values, setValues] = useState({
    username: "", 
    password: "", 
   })
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const change = (e) => {
     const { name, value } = e.target;
     setValues({ ...Values, [name]: value })
   }
   const submit = async () => {
     try{
       if(Values.username === "" || Values.password === "")
       {
         alert("All fields are required.")
       }else{
         const response = await axios.post("http://localhost:1000/ap1/v1/sign-in", Values)
         dispatch(authActions.signin());
         dispatch(authActions.changeRole(response.data.role))
         localStorage.setItem("id", response.data.id)
         localStorage.setItem("token", response.data.token)
         localStorage.setItem("role", response.data.role)
         navigate("/profile")
       }
     }catch(error){
       alert(error.response.data.message)
     }
   }
   return (
    <div className='h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>Sign In</h2>
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
          <button 
            type='button'
            className='w-full py-3 bg-yellow-900 text-white font-semibold rounded-lg hover:bg-yellow-800 transition duration-300'
            onClick={submit}
          >
            Sign In
          </button>
        </form>
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>Or</p>
          <p className='mt-4 text-gray-700'>
            Don't have an account? 
            <Link to='/SignUp' className='text-yellow-900 font-semibold hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn