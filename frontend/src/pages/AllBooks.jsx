import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/loader/Loader'
import BookCard from '../components/bookCard/BookCard'

const AllBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/ap1/v1/get-all-books")
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }
    fetch()
  }, [])

  return (
    <section className='py-12 px-4 lg:px-12 bg-gray-50'>
      <div className='container mx-auto bg-white shadow-xl rounded-lg p-8'>
        <h2 className='text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center'>
          All Books
        </h2>
        {!data.length ? (
          <div className='w-full h-screen flex items-center justify-center'>
            <Loader />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {data.map((book, index) => (
              <div key={index} className='transition-transform transform hover:scale-105'>
                <BookCard data={book} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AllBooks
