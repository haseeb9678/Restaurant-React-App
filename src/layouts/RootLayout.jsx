import React from 'react'
import Home from '../pages/Home'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
            <Outlet />
        </>
    )
}

export default RootLayout