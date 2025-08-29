import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

// Example Components
import Home from './pages/Home'
import OrderItem from './pages/OrderItem'
import RootLayout from './layouts/RootLayout'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='orderItem' element={<OrderItem />} />
        <Route path='cart' element={<Cart />} />
        <Route path='*' element={<ErrorPage />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App
