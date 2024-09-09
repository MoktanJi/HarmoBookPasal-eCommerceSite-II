import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({ data }) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  return (
        <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-xl space-y-4'>
          <div className='flex flex-col items-center text-center'>
            <img src={data.avatar} alt='Avatar' className='h-24 w-24 rounded-full object-cover mb-3 border-4 border-gray-200' />
            <p className='text-2xl font-semibold text-gray-800'>{data.username}</p>
            <p className='text-lg text-gray-600'>{data.email}</p>
          </div>
        <div className='w-full border-t border-gray-300 mt-4 hidden lg:block'></div>
        <div className='w-full flex flex-col items-center space-y-4 mt-4 lg:mt-0 hidden lg:flex'>
          <Link 
            to='/profile' 
            className='w-full py-2 text-center text-xl font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-yellow-900 hover:text-white transition duration-300'>
            Favourites
          </Link>
          <Link 
            to='/profile/settings' 
            className='w-full py-2 text-center text-xl font-semibold text-gray-800 bg-gray-200 rounded-lg hover:bg-yellow-900 hover:text-white transition duration-300'>
            Settings
          </Link>
        </div>
        <button 
          className='w-full py-2 text-xl font-semibold flex items-center justify-center bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition duration-300'
          onClick={() => {
            dispatch(authActions.signout())
            dispatch(authActions.changeRole("user"))
            localStorage.clear("id")
            localStorage.clear("token")
            localStorage.clear("role")
            history("/")
          }}>
          Sign Out
          <FontAwesomeIcon icon={faArrowRightFromBracket} className='ml-2' />
        </button>
      </div>
    )
}

export default Sidebar