import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BookCard from '../bookCard/BookCard'
import Loader from '../loader/Loader'


const Favourites = () => {
  const [FavouriteBook, setFavouriteBook] = useState()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/ap1/v1/get-favourite-book",{ headers })
      setFavouriteBook(response.data.data)
    }
    fetch()
  }, [FavouriteBook])

  return (
    <div className='h-auto bg-gray-100 px-6 py-8'>
      {!FavouriteBook && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {FavouriteBook && FavouriteBook.length === 0 && (
        <div className='text-3xl font-semibold text-gray-700 flex items-center justify-center h-[50vh]'>
          No Favourite Books
        </div>
      )}
      {FavouriteBook && FavouriteBook.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {FavouriteBook.map((items, i) => (
            <div key={i} className='transition-transform transform hover:scale-105'>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
        </div>
      )}
      
    </div>
  )
}

export default Favourites 