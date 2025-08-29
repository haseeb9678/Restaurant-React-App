import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Category from '../components/Category'
import FoodItems from '../components/FoodItems'

const Home = () => {
    return (
        <>
            <Hero />
            <Category />
            <FoodItems />
        </>
    )
}

export default Home