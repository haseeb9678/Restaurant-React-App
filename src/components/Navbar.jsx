import React, { useContext } from 'react'
import { useState } from 'react';
import { PiShoppingCart } from "react-icons/pi";
import { PiBag } from "react-icons/pi";
import { FoodContext } from '../contexts/foodData';
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [activePage, setActivePage] = useState('home')
    const { cartItems, orderItems } = useContext(FoodContext);
    const navigate = useNavigate();
    return (
        <nav className='w-full h-20 mb-3 flex items-center px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
            <div className='w-full flex items-center justify-between '>
                <h2 onClick={() => navigate('/')} className='text-orange-600 text-3xl font-bold md:text-4xl'>CHESSY.</h2>
                <ul className='hidden text-lg font-semibold md:flex gap-7'>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>Home</NavLink></li>
                    <li><NavLink to='/about' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>About</NavLink></li>
                    <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>Contact</NavLink></li>
                </ul>
                <div className='flex items-center gap-5'>

                    <div onClick={() => navigate('/order')} className='relative'>
                        {
                            orderItems.length > 0 ? <p
                                className='bg-orange-500 h-5 w-5
                                rounded-full text-white text-sm flex items-center
                                justify-center absolute -top-1 left-4'
                            > {orderItems.length}</p> : null
                        }

                        <PiBag className='text-3xl' />
                    </div>
                    <div onClick={() => navigate('/cart')} className='relative'>
                        {
                            cartItems.length > 0 ? <p
                                className='bg-orange-500 h-5 w-5
                                rounded-full text-white text-sm flex items-center
                                justify-center absolute -top-1 left-4'
                            > {cartItems.length}</p> : null
                        }

                        <PiShoppingCart className='text-3xl' />
                    </div>

                    <button className='cursor-pointer bg-orange-500 text-white rounded-full px-3 py-1 md:px-6 hover:bg-orange-600'>Sign up</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar