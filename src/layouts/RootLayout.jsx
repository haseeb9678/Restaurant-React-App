import React from 'react'
import Home from '../pages/Home'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RestaurantLogo from '../assets/frontend_assets/restaurant-logo.png'
import Footer from '../components/Footer'

const RootLayout = () => {
    const [hideNav, setHideNav] = React.useState(false)
    const navigate = useNavigate()
    return (
        <div className='flex flex-col min-h-screen'>
            {!hideNav ? <Navbar /> : (
                <nav className='w-full h-20 mb-3 flex items-center px-2 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50 overflow-hidden'>
                    <div className='w-full flex items-center justify-between overflow-hidden'>
                        <div className='overflow-hidden'>
                            <img
                                onClick={() => navigate('/')}
                                src={RestaurantLogo}
                                alt='Restaurant Logo'
                                className=' pt-4 w-47 cursor-pointer object-cover'
                            />
                        </div>
                    </div>
                </nav>
            )}
            <div className='w-[95%] flex-1  mx-auto flex flex-col gap-3 md:w-[98%]'>
                <Outlet context={{ hideNav, setHideNav }} />
            </div>
            <Footer />
        </div>
    )
}

export default RootLayout