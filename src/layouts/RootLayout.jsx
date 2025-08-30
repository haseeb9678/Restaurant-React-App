import React from 'react'
import Home from '../pages/Home'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const RootLayout = () => {
    const [hideNav, setHideNav] = React.useState(false)
    const navigate = useNavigate()
    return (
        <>
            {!hideNav ? <Navbar /> : (
                <nav className='w-full h-20 mb-3 flex items-center px-7 shadow-sm/5 bg-white/90 sticky top-0 backdrop-blur-md z-50'>
                    <div className='w-full flex items-center justify-start '>
                        <h2 onClick={() => navigate('/')} className='cursor-pointer text-orange-600 text-3xl font-bold md:text-4xl'>CHESSY.</h2>
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