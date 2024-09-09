import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-8'>
      <div className='container mx-auto px-6 lg:px-12'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-center md:text-left mb-6 md:mb-0'>
            <h1 className='text-2xl font-semibold mb-4'>Hamro Book Pasal</h1>
            <p className='text-sm mb-4'>
              &copy; {new Date().getFullYear()} Hamro Book Pasal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
