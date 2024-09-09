import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { CiEdit } from "react-icons/ci";
import { FiDelete } from "react-icons/fi";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/ap1/v1/get-book-by-id/${id}`
      )
      setData(response.data.data)
    };
    fetch()
  }, [])
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id
  }
  const handleFavourite = async () => {
    const response = await axios.put("http://localhost:1000/ap1/v1/add-book-to-favourite",{},{ headers })
    alert(response.data.message)
  }
  const handleCart = async () => {
    const response = await axios.put("http://localhost:1000/ap1/v1/add-to-cart",{},{ headers })
    alert(response.data.message)
  }

  return (
    <>
      {Data ? (
        <div className='px-6 md:px-12 py-8 bg-gray-100 flex flex-col lg:flex-row lg:space-x-8'>
          <div className='bg-white rounded-lg p-4 flex flex-col lg:flex-row lg:items-start lg:justify-center lg:w-3/6 space-y-4 lg:space-y-0'>
            <img
              src={Data.url}
              alt={Data.title}
              className='h-[50vh] lg:h-[70vh] rounded-lg object-cover'
            />
            <div className='flex flex-col space-y-4 lg:space-y-4 lg:flex-col lg:ml-6'>
              {isSignedIn && role === "user" && (
                <div className='flex flex-col space-y-4 lg:space-y-4'>
                  <button
                    className='bg-white border border-yellow-900 rounded-full text-xl p-3 flex items-center justify-center hover:bg-yellow-900 hover:text-white transition-all duration-300'
                    onClick={handleFavourite}
                  >
                    <CiHeart className='text-2xl' />
                    <span className='ms-3 hidden lg:block'>Favourites</span>
                  </button>
                  <button
                    className='bg-white border border-yellow-900 rounded-full text-xl p-3 flex items-center justify-center hover:bg-yellow-900 hover:text-white transition-all duration-300'
                    onClick={handleCart}
                  >
                    <FiShoppingCart className='text-2xl' />
                    <span className='ms-3 hidden lg:block'>Add to Cart</span>
                  </button>
                </div>
              )}
              {isSignedIn && role === "admin" && (
                <div className='flex flex-col space-y-4 lg:space-y-4'>
                  <button
                    className='bg-white border border-yellow-900 rounded-full text-xl p-3 flex items-center justify-center hover:bg-yellow-900 hover:text-white transition-all duration-300'
                  >
                    <CiEdit className='text-2xl' />
                    <span className='ms-3 hidden lg:block'>Edit</span>
                  </button>
                  <button
                    className='bg-white border border-yellow-900 rounded-full text-xl p-3 flex items-center justify-center hover:bg-yellow-900 hover:text-white transition-all duration-300'
                  >
                    <FiDelete className='text-2xl' />
                    <span className='ms-3 hidden lg:block'>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className='p-5 lg:w-3/6'>
            <h1 className='text-4xl lg:text-6xl text-black font-semibold'>{Data.title}</h1>
            <p className='text-2xl lg:text-4xl text-black mt-1'>by {Data.author}</p>
            <p className='text-lg lg:text-2xl text-black mt-4'>{Data.desc}</p>
            <p className='text-lg flex items-center mt-4 text-black'>
              <GrLanguage className='me-3 text-xl' />
              {Data.language}
            </p>
            <p className='text-2xl lg:text-3xl text-black font-semibold mt-4'>Price: रु {Data.price}</p>
          </div>
        </div>
      ) : (
        <div className='h-screen bg-white flex items-center justify-center'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default ViewBookDetails