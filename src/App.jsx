import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Category from './components/Category'
import FoodItems from './components/FoodItems'

const App = () => {
  return (
    <div className='w-[95%] mx-auto flex flex-col gap-3 md:w-[98%]'>
      <Navbar />
      <Hero />
      <Category />
      <FoodItems />
    </div>
  )
}

export default App