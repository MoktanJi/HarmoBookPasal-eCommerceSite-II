import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../loader/Loader';


const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  const change = (e) => {
    const { name, value } = e.target
    setValue({ ...Value, [name]: value})
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/ap1/v1/get-user-information",{ headers })
      setProfileData(response.data)
      setValue({ address: response.data.address })
    }
    fetch()
  }, [])

  const submit = async () => {
    const response = await axios.put("http://localhost:1000/ap1/v1/update-address",Value, { headers })
    console.log(response)
  }
  return (
    <>
      {!ProfileData ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div className='p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-semibold mb-8 text-gray-800'>
            Settings
          </h1>
          <div className='bg-white shadow-md rounded-lg p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='flex flex-col'>
                <label htmlFor='username' className='text-sm font-medium text-gray-600'>Username</label>
                <p id='username' className='p-2 mt-2 border border-gray-300 rounded-lg font-semibold bg-gray-50'>
                  {ProfileData.username}
                </p>
              </div>
              <div className='flex flex-col'>
                <label htmlFor='email' className='text-sm font-medium text-gray-600'>Email</label>
                <p id='email' className='p-2 mt-2 border border-gray-300 rounded-lg font-semibold bg-gray-50'>
                  {ProfileData.email}
                </p>
              </div>
              <div className='flex flex-col md:col-span-2'>
                <label htmlFor='address' className='text-sm font-medium text-gray-600'>Address</label>
                <textarea
                  id='address'
                  className='p-2 mt-2 border border-gray-300 rounded-lg bg-gray-50 font-semibold resize-none'
                  rows='5'
                  placeholder='Enter your address'
                  name='address'
                  value={Value.address}
                  onChange={change}
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end'>
              <button
                className='font-semibold px-4 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition-all duration-300'
                onClick={submit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Settings