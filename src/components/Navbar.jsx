import React, { useContext } from 'react'
import { PiShoppingCart, PiBag, PiUserCircleLight } from "react-icons/pi";
import RestaurantLogo from '../assets/frontend_assets/restaurant-logo.png'
import { useNavigate } from 'react-router-dom'
import { UserInfoContext } from '../contexts/userInfo'
import { MenuInfoContext } from '../contexts/menuInfo';
import { SlMagnifier } from "react-icons/sl";

const Navbar = () => {
    const { loggedIn, loggedUser } = useContext(UserInfoContext)
    const navigate = useNavigate();
    const { setSearch, searchInput } = useContext(MenuInfoContext)

    return (
        <nav className='w-full h-20 mb-3 flex items-center pl-2 pr-3 md:pr-5 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50 overflow-hidden'>
            <div className='w-full flex items-center justify-between'>
                <div className='overflow-hidden'>
                    <img
                        onClick={() => navigate('/')}
                        src={RestaurantLogo}
                        alt='Restaurant Logo'
                        className="pt-4 w-44 md:w-48 cursor-pointer object-contain"
                    />

                </div>

                <div className='flex items-center gap-1'>
                    <div className='hidden sm:block md:w-[70%] mx-5'>
                        <form onSubmit={(e) => e.preventDefault()} className='w-full flex justify-end items-center'>
                            <label htmlFor="search" className='flex flex-row-reverse w-full max-w-80 lg:max-w-140 justify-between items-center bg-gray-500/10 h-10 rounded-md px-3 md:px-5'>
                                <input
                                    ref={searchInput}
                                    onChange={(e) => setSearch(e.currentTarget.value)}
                                    className='bg-transparent border-none outline-none w-full'
                                    type="text" name="search" id="search"
                                    placeholder='Search item' />
                                <span className='mr-3 border-r-2 text-lg text-black/70 border-r-black/10 h-full flex items-center pr-3'><SlMagnifier /></span>
                            </label>
                        </form>
                    </div>
                    <div className='flex gap-4'>
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
            </div>
        </nav>
    )
}

export default Navbar
