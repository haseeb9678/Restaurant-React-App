import React from 'react'
import Home from '../pages/Home'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
    return (
        <>
            <Navbar />
            <div className='w-[95%] mx-auto flex flex-col gap-3 md:w-[98%]'>
                <Outlet />
            </div>
        </>
    )
}

export default RootLayout