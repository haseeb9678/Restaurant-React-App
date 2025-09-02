import React from 'react'

const Footer = () => {
    return (
        <footer
            style={{ boxShadow: "0 -1px 4px rgba(0,0,0,0.1)" }}
            className='w-full  mt-5 h-20 px-7 flex items-center text-center justify-center bg-white/90 backdrop-blur-md z-50'>
            <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} <span className='font-semibold'>Cheesy.com</span>  Fresh meals, happy moments❤️. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer