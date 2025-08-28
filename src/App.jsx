import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className='w-[95%] mx-auto flex flex-col gap-5'>
      <Navbar />
      <Hero />
    </div>
  )
}

export default App