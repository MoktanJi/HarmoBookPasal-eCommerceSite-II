import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { Routes, Route } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ViewBookDetails from './components/viewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/profile/Favourites'
import OrderHistory from './components/profile/OrderHistory'
import Settings from './components/profile/Settings'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role)
  useEffect(() => {
    if ( 
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role") 
    ) {
      dispatch(authActions.signin())
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  }, [])
  return (
    <div>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='profile' element={<Profile />}>
            <Route index element={<Favourites />} />
            <Route path='/profile/orderHistory' element={<OrderHistory />} />
            <Route path='/profile/settings' element={<Settings />} />
          </Route>
          <Route path='signIn' element={<SignIn />} />
          <Route path='signUp' element={<SignUp />} />
          <Route path='view-book-details/:id' element={<ViewBookDetails />} />
        </Routes>
        <Footer />
    </div>
  )
}
export default App