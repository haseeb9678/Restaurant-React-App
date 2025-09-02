import React, { useContext } from 'react'
import { UserInfoContext } from '../contexts/userInfo'

const UserDashboard = () => {
    const { loggedUser } = useContext(UserInfoContext)

    const getActiveOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'processing').length
    }

    const getProcessedOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'processed').length
    }
    const getCancelledOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'cancelled').length
    }
    return (
        <section className='w-full overflow-scroll flex flex-col gap-5 scrollbar-hide'>
            <h2 className='font-bold text-lg md:text-2xl'>Users Dashboard</h2>
            <div className='flex gap-5 flex-wrap'>
                <div className='bg-gray-500/90 text-white h-25 w-40 md:w-60 md:h-23 flex flex-col items-center gap-1 p-3 rounded-md'>
                    <h2 className='font-semibold text-nowrap text-base  md:text-lg'>Active Orders</h2>
                    <p className='font-semibold text-xl'>{getActiveOrders()}</p>
                </div>
                <div className='bg-green-500/80 text-shadow-sm text-white h-25 w-40 md:w-60 md:h-23  flex flex-col items-center gap-1 p-3 rounded-md'>
                    <h2 className='font-semibold  text-nowrap text-base  md:text-lg'>Processed Orders</h2>
                    <p className='font-semibold text-xl'>{getProcessedOrders()}</p>
                </div>
                <div className='bg-red-500/90 text-white h-25 w-40 md:w-60  md:h-23 flex flex-col items-center gap-1 p-3 rounded-md'>
                    <h2 className='font-semibold text-nowrap text-base  md:text-lg'>Cancelled Orders</h2>
                    <p className='font-semibold text-xl'>{getCancelledOrders()}</p>
                </div>
            </div>
        </section>
    )
}

export default UserDashboard