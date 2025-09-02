import React, { useContext } from 'react'
import { PiShoppingCart, PiBag, PiUserCircleLight } from "react-icons/pi";
import RestaurantLogo from '../assets/frontend_assets/restaurant-logo.png'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../contexts/userInfo'
import { Link, NavLink } from 'react-scroll'

const Navbar = () => {
    const { loggedIn, loggedUser } = useContext(UserInfoContext)
    const navigate = useNavigate();

    return (
        <nav className='w-full h-20 mb-3 flex items-center px-4 md:px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
            <div className='w-full flex items-center justify-between'>
                <img
                    onClick={() => navigate('/')}
                    src={RestaurantLogo}
                    alt='Restaurant Logo'
                    className='pt-4 -ml-7 w-47 h-47 cursor-pointer overflow-hidden'
                />

                <div className='flex items-center gap-5 md:gap-7'>

                    <div onClick={() => navigate('/order')} className='relative cursor-pointer'>
                        {loggedIn && loggedUser.ordersData.orders.length > 0 && (
                            <p className='bg-orange-500 h-6 w-6 rounded-full text-white text-sm flex items-center justify-center absolute -top-1 left-5'>
                                {loggedUser.ordersData.orders.length}
                            </p>
                        )}
                        <PiBag className='text-4xl' />
                    </div>

                    <div onClick={() => navigate('/cart')} className='relative cursor-pointer'>
                        {loggedIn && loggedUser.ordersData.cart.length > 0 && (
                            <p className='bg-orange-500 h-6 w-6 rounded-full text-white text-sm flex items-center justify-center absolute -top-1 left-5'>
                                {loggedUser.ordersData.cart.length}
                            </p>
                        )}
                        <PiShoppingCart className='text-4xl' />
                    </div>

                    {loggedIn ? (
                        <div className='flex flex-col cursor-pointer items-center justify-center mt-3 -ml-1 md:-ml-2 md:mt-4'>
                            <PiUserCircleLight onClick={() => navigate('/user')} className='text-4xl' />
                            <p className='text-[9px] md:text-[11px] text-black/90'>{loggedUser.name}</p>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/auth')}
                            className='cursor-pointer bg-orange-500 text-white rounded-full px-2 text-nowrap py-1 md:px-6 hover:bg-orange-600'>
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
