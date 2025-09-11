import React, { useContext, useState } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AdminDashboard = ({ setShow, setDashFilter }) => {
    const { users } = useContext(UserInfoContext)
    const getTotalUsers = () => {
        return Object.keys(users).length
    }
    const getTotalOrders = () => {
        return users.reduce((count, user) =>
            count + user.ordersData.orders.length, 0)
    }
    const getActiveOrders = () => {
        return users.reduce((count, user) =>
            count + user.ordersData.orders.filter((o) =>
                o.status == 'processing').length, 0)
    }

    const getProcessedOrders = () => {
        return users.reduce((count, user) =>
            count + user.ordersData.orders.filter(o =>
                o.status == 'processed').length, 0)
    }

    const getCancelledOrders = () => {
        return users.reduce((count, user) =>
            count + user.ordersData.orders.filter(o =>
                o.status == 'cancelled').length, 0)
    }

    const getTotalSale = () => {
        return users.reduce((count, user) =>
            count + user.ordersData.orders.reduce((total, o) =>
                o.status == 'processed' ? total + o.totalPrice : total, 0), 0)
    }
    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-md md:text-3xl'>Dashboard</h2>
            <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
                <div
                    onClick={() => setShow("users")}
                    className="bg-orange-500/90 lg:min-h-35 cursor-pointer hover:bg-orange-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Users
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">{getTotalUsers()}</p>
                </div>
                <div
                    onClick={() => {
                        setShow("orders")
                        setDashFilter("all")
                    }}
                    className="overflow-hidden bg-purple-500/90 cursor-pointer hover:bg-purple-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Orders
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">{getTotalOrders()}</p>
                </div>
                <div
                    className="overflow-hidden bg-blue-500/90 cursor-pointer hover:bg-blue-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Sale
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">${getTotalSale()}</p>
                </div>
                <div
                    onClick={() => setShow("activeOrders")}
                    className="overflow-hidden bg-gray-500/90 cursor-pointer hover:bg-gray-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Active Orders
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">{getActiveOrders()}</p>
                    <div className='w-14 sm:w-16 md:w-20'>
                        <CircularProgressbar
                            value={getActiveOrders() / getTotalOrders()}
                            maxValue={1}
                            text={`${Math.round(getActiveOrders() / getTotalOrders())}%`}
                            styles={
                                {
                                    path: { stroke: "fff" },
                                    text: { fontSize: "19px", fontWeight: "bold", fill: "#fff" }
                                }
                            }
                        />
                    </div>
                </div>
                <div
                    onClick={() => {
                        setShow("orders")
                        setDashFilter("processed")
                    }}
                    className="overflow-hidden bg-green-500/80 cursor-pointer hover:bg-green-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Processed Orders
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">{getProcessedOrders()}</p>
                    <div className='w-14 sm:w-16 md:w-20'>
                        <CircularProgressbar
                            value={getProcessedOrders() / getTotalOrders()}
                            maxValue={1}
                            text={`${Math.round((getProcessedOrders() / getTotalOrders()) * 100)}%`}
                            styles={{
                                path: { stroke: "#fff" },
                                text: { fill: "#fff", fontSize: "19px", fontWeight: "bold" }
                            }}
                        />
                    </div>
                </div>
                <div
                    onClick={() => {
                        setShow("orders")
                        setDashFilter("cancelled")
                    }}
                    className="overflow-hidden bg-red-500/90 cursor-pointer hover:bg-red-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                >
                    <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                        Total Cancelled Orders
                    </h2>
                    <p className="font-bold text-lg sm:text-xl">{getCancelledOrders()}</p>
                    <div className='w-14 sm:w-16 md:w-20'>
                        <CircularProgressbar
                            value={getCancelledOrders() / getTotalOrders()}
                            maxValue={1}
                            text={`${Math.round(getCancelledOrders() / getTotalOrders() * 100)}%`}
                            styles={{
                                path: { stroke: "#fff" },
                                text: { fontSize: "19px", fontWeight: "bold", fill: "#fff" }
                            }}
                        />
                    </div>
                </div>


            </div>
        </section>
    )
}

export default AdminDashboard