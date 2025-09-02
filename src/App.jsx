import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Example Components
import Home from './pages/Home'
import OrderItem from './pages/OrderItem'
import RootLayout from './layouts/RootLayout'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'
import Order from './pages/Order'
import Auth from './pages/Auth'
import UserPage from './pages/UserPage'
import AdminPage from './pages/AdminPage'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='admin' element={<AdminPage />} />
        <Route path='user' element={<UserPage />} />
        <Route path='orderItem' element={<OrderItem />} />
        <Route path='cart' element={<Cart />} />
        <Route path='order' element={<Order />} />
        <Route path='auth' element={<Auth />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </>
  )
}

export default App
