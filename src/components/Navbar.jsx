import React, { useContext } from 'react'
import { useState } from 'react';
import { PiShoppingCart } from "react-icons/pi";
import { PiBag } from "react-icons/pi";
import { PiUserCircleLight } from "react-icons/pi";
import RestaurantLogo from '../assets/frontend_assets/restaurant-logo.png'
import { FoodContext } from '../contexts/foodData';
import { NavLink, useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../contexts/userInfo';

const Navbar = () => {
    const { loggedIn, loggedUser } = useContext(UserInfoContext)
    const navigate = useNavigate();
    return (
        <nav className='w-full h-20 mb-3 flex items-center px-4 md:px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
            <div className='w-full flex items-center justify-between '>
                <img onClick={() => navigate('/')} src={RestaurantLogo} alt='Restaurnt Logo' className='pt-4 -ml-7 w-47 h-47 cursor-pointer overflow-hidden' />
                <ul className='hidden text-lg font-semibold md:flex gap-7'>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>Home</NavLink></li>
                    <li><NavLink to='/about' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>About</NavLink></li>
                    <li><NavLink to='/contact' className={({ isActive }) => isActive ? 'border-b-2 border-orange-500 ' : 'hover:text-orange-500'}>Contact</NavLink></li>
                </ul>
                <div className='flex items-center gap-2 md:gap-4'>

                    <div onClick={() => navigate('/order')} className='relative cursor-pointer'>
                        {
                            loggedIn && loggedUser.ordersData.orders.length > 0 ? <p
                                className='bg-orange-500 h-4.5 w-4.5 md:h-5 md:w-5
                                rounded-full text-white text-sm flex items-center
                                justify-center absolute  -top-1 left-4'
                            > {loggedUser.ordersData.orders.length}</p> : null
                        }

                        <PiBag className='text-3xl' />
                    </div>
                    <div onClick={() => navigate('/cart')} className='relative cursor-pointer'>
                        {
                            loggedIn && loggedUser.ordersData.cart.length > 0 ? <p
                                className='bg-orange-500 h-4.5 w-4.5 md:h-5 md:w-5
                                rounded-full text-white text-sm flex items-center
                                justify-center   absolute -top-1 left-4'
                            > {loggedUser.ordersData.cart.length}</p> : null
                        }

                        <PiShoppingCart className='text-3xl' />
                    </div>

                    {
                        loggedIn ? (
                            <div className='flex flex-col cursor-pointer items-center justify-center mt-3 -ml-1 md:-ml-2 md:mt-4'>
                                <PiUserCircleLight onClick={() => navigate('/user')} className='text-3xl' />
                                <p className='text-[9px] md:text-[11px] text-black/90'>{loggedUser.name}</p>
                            </div>
                        ) : <button
                            onClick={() => navigate('/auth')}
                            className='cursor-pointer bg-orange-500 text-white rounded-full px-2 text-nowrap py-1 md:px-6 hover:bg-orange-600'>Sign in</button>
                    }


                </div>
            </div>
        </nav>
    )
}

export default Navbar