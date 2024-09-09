import React, { useEffect, useState } from 'react'
import Sidebar from '../components/profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import MobileNav from '../components/profile/MobileNav'

const Profile = () => {
  //const isSignedIn = useSelector();
  const [Profile, setProfile] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/ap1/v1/get-user-information",{ headers })
      setProfile(response.data);
    }
    fetch()
 }, [])
  
  return (
    <div className='bg-gray-100 min-h-screen px-4 md:px-12 py-8 flex flex-col md:flex-row gap-4 text-black'>
      {!Profile ? (
        <div className='w-full flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <>
          <div className='w-full md:w-1/4 lg:w-1/5 bg-white rounded-lg shadow-md'>
            <Sidebar data={Profile} />
            <MobileNav />
          </div>
          <div className='w-full md:w-3/4 lg:w-4/5 bg-white rounded-lg shadow-md p-6'>
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default Profile