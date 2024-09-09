import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaGripLines } from 'react-icons/fa'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const links = [
    { title: 'Home', link: '/' },
    { title: 'All Books', link: '/all-books' },
    ...(isSignedIn ? [
      { title: 'Cart', link: '/cart' },
      { title: 'Profile', link: '/profile' }
    ] : [])
  ]
  const authLinks = !isSignedIn ? [
    { title: 'SignIn', link: '/SignIn' },
    { title: 'SignUp', link: '/SignUp' }
  ] : []
  const [MobileNav, setMobileNav] = useState('hidden')

  return (
    <>
      <nav className='z-50 relative flex bg-white text-black px-8 py-3 items-center justify-between shadow-lg rounded-md'>
        <Link to='/' className='flex items-center'>
          <img
            className='h-12 md:h-14 me-2'
            src='https://cdn-icons-png.flaticon.com/128/8017/8017848.png'
            alt='logo'
          />
          <h1 className='text-xl md:text-2xl font-semibold hover:text-yellow-700 transition-all duration-300'>
            Hamro Book Pasal
          </h1>
        </Link>
        <div className='hidden md:flex items-center gap-6'>
          {links.map((item, i) => (
            <Link
              to={item.link}
              className={`text-lg font-medium transition-all duration-300 ${
                item.title === 'Profile'
                  ? 'px-4 py-2 bg-yellow-700 text-white rounded-lg hover:bg-yellow-600'
                  : 'hover:text-yellow-700'
              }`}
              key={i}
            >
              {item.title}
            </Link>
          ))}
          {authLinks.map((item, i) => (
            <Link
              to={item.link}
              className={`px-4 py-2 rounded-lg font-medium text-lg transition-all duration-300 ${
                item.title === 'SignIn'
                  ? 'border border-yellow-700 text-black hover:bg-yellow-700 hover:text-white'
                  : 'bg-yellow-700 text-white hover:bg-yellow-600'
              }`}
              key={i}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <button
          className='block md:hidden text-2xl text-black hover:text-yellow-700'
          onClick={() => setMobileNav(MobileNav === 'hidden' ? 'block' : 'hidden')}
        >
          <FaGripLines />
        </button>
      </nav>
      <div
        className={`${MobileNav} bg-white h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center shadow-lg rounded-b-md`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className={`text-black text-3xl mb-6 font-semibold transition-all duration-300 ${
              item.title === 'Profile'
                ? 'px-6 py-3 bg-yellow-700 text-white rounded-lg hover:bg-yellow-600'
                : 'hover:text-yellow-700'
            }`}
            key={i}
            onClick={() => setMobileNav('hidden')}
          >
            {item.title}
          </Link>
        ))}
        {authLinks.map((item, i) => (
          <Link
            to={item.link}
            className={`px-6 py-2 mb-6 text-2xl font-semibold rounded-lg transition-all duration-300 ${
              item.title === 'SignIn'
                ? 'border border-yellow-700 text-black hover:bg-yellow-700 hover:text-white'
                : 'bg-yellow-700 text-white hover:bg-yellow-600'
            }`}
            key={i}
          >
            {item.title}
          </Link>
        ))}
      </div>
    </>
  )
}

export default Navbar
