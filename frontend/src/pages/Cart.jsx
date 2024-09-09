import React, { useState, useEffect } from 'react'
import Loader from '../components/loader/Loader'
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () =>{
  const [Cart, setCart] = useState()
  const [Total, setTotal] = useState(0)
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/ap1/v1/get-user-cart", { headers })
      setCart(response.data.data)
    }
    fetch()
  }, [Cart])
  
  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/ap1/v1/remove-from-cart/${bookid}`,{},{ headers })
    alert(response.data.message)
  }

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((item) => {
        total += item.price
      })
      setTotal(total)
    } else {
      setTotal(0)
    }
  }, [Cart]) 

  const PlaceOrder = async () => {
    try{
      const response = await axios.post(`http://localhost:1000/ap1/v1/place-order`,{ order: Cart},{ headers })
      alert(response.data.message)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='px-4 md:px-12 py-8 h-screen'>
      {!Cart && 
        <div className='w-full h-full flex items-center justify-center'>
          <Loader />
        </div>
      }
      {Cart && Cart.length === 0 && (
        <div className='h-full flex flex-col items-center justify-center'>
          <h1 className='text-4xl lg:text-5xl font-semibold text-gray-800 mb-6'>
            Empty Cart
          </h1>
          <img src='./cart.png' alt='empty cart' className='h-48 lg:h-60' />
        </div>
      )}
      {Cart && Cart.length > 0 && (
        <div>
          <h1 className='text-4xl md:text-5xl font-semibold text-gray-800 mb-8'>Your Cart</h1>
          {Cart.map((item, i) => (
            <div key={i} className='w-full mb-6 rounded-lg flex flex-col md:flex-row bg-gray-100 shadow-lg overflow-hidden'>
              <img src={item.url} alt={item.title} className='w-full md:w-1/3 h-48 object-contain' /> {/* Full image but smaller size */}
              <div className='w-full md:w-2/3 p-4 flex flex-col justify-between'>
                <h2 className='text-2xl md:text-3xl font-semibold text-gray-800'>{item.title}</h2>
                <p className='text-sm md:text-base text-gray-600 mt-2'>
                  {item.desc.length > 100 ? `${item.desc.slice(0, 100)}...` : item.desc}
                </p>
                <div className='flex items-center justify-between mt-4'>
                  <h3 className='text-xl font-semibold text-gray-800'>रु {item.price}</h3>
                  <button 
                    className='text-2xl text-red-600 hover:text-red-800 transition duration-300'
                    onClick={() => deleteItem(item._id)}
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className='mt-8 p-4 bg-gray-200 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>Total Amount</h2>
            <div className='flex justify-between text-lg text-gray-800 mb-4'>
              <span>{Cart.length} items</span>
              <span>रु {Total}</span>
            </div>
            <button 
              className='w-full py-3 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition duration-300'
              onClick={PlaceOrder}
            >
              Place Your Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart