import React from 'react'
import { useState } from 'react';
import { PiShoppingCart } from "react-icons/pi";

const Navbar = () => {
    const [activePage, setActivePage] = useState('home')
    return (
        <nav className='w-full h-20 mb-3 flex items-center px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
            <div className='w-full flex items-center justify-between '>
                <h2 className='text-orange-600 text-3xl font-bold md:text-4xl'>Rest.</h2>
                <ul className='hidden text-lg font-semibold md:flex gap-7'>
                    <li onClick={() => setActivePage("home")} className={activePage == 'home' ? "border-b-3 border-orange-500" : ""}>Home</li>
                    <li onClick={() => setActivePage("about")} className={activePage == 'about' ? "border-b-3 border-orange-500" : ""}>About</li>
                    <li onClick={() => setActivePage("contact")} className={activePage == 'contact' ? "border-b-3 border-orange-500" : ""}>Contact</li>
                </ul>
                <div className='flex items-center gap-3'>
                    <PiShoppingCart className='text-2xl' />
                    <button className='cursor-pointer bg-orange-500 text-white rounded-full px-3 py-1 md:px-6 hover:bg-orange-600'>Sign up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar