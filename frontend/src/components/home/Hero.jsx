import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className='relative h-[75vh] flex flex-col md:flex-row items-center justify-center bg-gray-100'>
      <div className='absolute inset-0 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 opacity-50'></div>
      <div className='relative z-10 flex flex-col items-center md:items-start justify-center w-full md:w-1/2 px-6 lg:px-12'>
        <h1 className='text-4xl lg:text-6xl font-bold text-yellow-900 mb-4 lg:mb-6 text-center md:text-left'>
          Deciding What to Read Next?
        </h1>
        <p className='text-lg lg:text-xl text-gray-800 mb-6 text-center md:text-left'>
          You’re in the right place. Order books at the best prices and explore new genres.
        </p>
        <Link 
          to='/all-books'
          className='bg-yellow-900 text-white text-xl lg:text-2xl font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-700 transition-all duration-300'
        >
          Discover Books
        </Link>
      </div>
      <div className='relative w-full md:w-1/2 mt-8 md:mt-0 flex justify-center'>
        <img src='./hero.png' alt='hero' className='w-full h-auto max-w-lg rounded-lg shadow-md' />
      </div>
    </section>
  )
}

export default Hero
