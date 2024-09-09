import React from 'react'
import Hero from '../components/home/Hero'
import RecentlyAdded from '../components/home/RecentlyAdded'

const Home = () => {
  return (
    <div className='bg-white text-black px-10 py-8'>
      <Hero />
      <RecentlyAdded />
    </div>
  )
}

export default Home