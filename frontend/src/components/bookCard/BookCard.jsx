import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  }
  const handleFavouriteRemove = async () => {
    const response = await axios.put("http://localhost:1000/ap1/v1/remove-book-from-favourite",{},{ headers })
    alert(response.data.message)
  }
  
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-gray-100 p-4 flex items-center justify-center'>
          <img 
            src={data.url} 
            alt={data.title} 
            className='h-[40vh] object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-105' 
          />
        </div>
        <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2 text-center'>{data.title}</h2>
          <p className='text-lg text-gray-600 mb-2 text-center'>by {data.author}</p>
          <p className='text-lg font-semibold text-gray-900 text-center'>रु {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button 
          className='w-full bg-yellow-900 text-white py-2 rounded-b-lg font-semibold hover:bg-yellow-700 transition-colors duration-300'
          onClick={handleFavouriteRemove}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  )
}

export default BookCard