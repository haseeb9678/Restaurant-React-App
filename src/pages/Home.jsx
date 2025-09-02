import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import FoodItems from '../components/FoodItems'
import About from '../components/About'
import Contact from '../components/Contact'

const Home = () => {
    return (
        <section id='home' className='flex flex-col gap-4'>
            <Hero />
            <Category />
            <FoodItems />
            <About />
            <Contact />
        </section>
    )
}

export default Home