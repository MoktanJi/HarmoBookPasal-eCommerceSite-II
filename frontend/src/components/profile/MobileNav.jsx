import React from 'react'
import { Link } from 'react-router-dom'

const MobileNav = () => {
  return (
        <div className='w-full flex flex-col items-center space-y-4 mt-4 lg:mt-0 flex lg:hidden '>
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
  )
}

export default MobileNav