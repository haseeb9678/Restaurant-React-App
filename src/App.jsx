import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Category from './components/Category'

const App = () => {
  return (
    <div className='w-[95%] mx-auto flex flex-col gap-5 md:w-[98%]'>
      <Navbar />
      <Hero />
      <Category />
    </div>
  )
}

export default App