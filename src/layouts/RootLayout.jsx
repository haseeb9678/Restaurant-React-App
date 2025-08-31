import React from 'react'
import Home from '../pages/Home'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RestaurantLogo from '../assets/frontend_assets/restaurant-logo.png'

const RootLayout = () => {
    const [hideNav, setHideNav] = React.useState(false)
    const navigate = useNavigate()
    return (
        <>
            {!hideNav ? <Navbar /> : (
                <nav className='w-full h-20 mb-3 flex items-center px-2 md:px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
                    <div className='w-full flex items-center justify-start '>
                        <img onClick={() => navigate('/')} src={RestaurantLogo} alt='Restaurnt Logo' className='pt-3 w-43 h-40 cursor-pointer overflow-hidden' />
                    </div>
                </nav>
            )}
            <div className='w-[95%] mx-auto flex flex-col gap-3 md:w-[98%]'>
                <Outlet context={{ hideNav, setHideNav }} />
            </div>
        </>
    )
}

export default RootLayout