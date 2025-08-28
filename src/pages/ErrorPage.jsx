import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col gap-5 justify-center items-center mt-32 text-xl'>Error 404! Page not found...

            <button className='bg-orange-500 hover:bg-orange-600 text-white cursor-pointer text-base rounded-full px-4 py-1' onClick={() => navigate('/')}>Go to home Page</button>
        </div>
    )
}

export default ErrorPage