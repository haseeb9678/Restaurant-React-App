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
        <nav className='w-full h-20 mb-3 flex items-center pl-2 pr-3 md:pr-5 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50 overflow-hidden'>
            <div className='w-full flex items-center justify-between'>
                <div className='overflow-hidden'>
                    <img
                        onClick={() => navigate('/')}
                        src={RestaurantLogo}
                        alt='Restaurant Logo'
                        className='pt-4 w-47 cursor-pointer object-cover'
                    />

                </div>

                <div className='flex items-center gap-4 md:gap-6'>

                    <div onClick={() => navigate('/order')} className='relative cursor-pointer'>
                        {loggedIn && loggedUser.ordersData.orders.length > 0 && (
                            <p className='bg-orange-500 w-5 md:w-6 rounded-full text-white text-sm flex items-center justify-center absolute -top-1 left-4 md:left-5'>
                                {loggedUser.ordersData.orders.length}
                            </p>
                        )}
                        <PiBag className='text-3xl md:text-4xl' />
                    </div>

                    <div onClick={() => navigate('/cart')} className='relative cursor-pointer'>
                        {loggedIn && loggedUser.ordersData.cart.length > 0 && (
                            <p className='bg-orange-500 w-5 md:w-6 rounded-full text-white text-sm flex items-center justify-center absolute -top-1 left-4 md:left-5'>
                                {loggedUser.ordersData.cart.length}
                            </p>
                        )}
                        <PiShoppingCart className='text-3xl md:text-4xl' />
                    </div>

                    {loggedIn ? (
                        <div className='flex flex-col cursor-pointer items-center justify-center mt-3 -ml-1 md:-ml-2 md:mt-4'>
                            <PiUserCircleLight onClick={() => navigate('/user')} className='text-3xl md:text-4xl' />
                            <p className='text-[9px] md:text-[11px] text-black/90'>{loggedUser.name}</p>
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate('/auth')}
                            className='cursor-pointer bg-orange-500 text-white rounded-full px-3 text-nowrap py-1 md:px-6 hover:bg-orange-600'>
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
