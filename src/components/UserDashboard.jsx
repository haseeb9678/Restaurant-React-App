import React, { useContext } from 'react'
import { UserInfoContext } from '../contexts/userInfo'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
    const { loggedUser } = useContext(UserInfoContext)
    const navigate = useNavigate()
    const getActiveOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'processing').length
    }

    const getProcessedOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'processed').length
    }
    const getCancelledOrders = () => {
        return loggedUser.ordersData.orders.filter((order) => order.status == 'cancelled').length
    }

    const totalSpent = () => {
        const amount = loggedUser.ordersData.orders.filter((order) => order.status == 'processed').reduce((sum, o) => sum + o.totalPrice, 0)
        return amount;
    }
    return (
        <section className='w-full overflow-scroll flex flex-col gap-10 scrollbar-hide'>
            <div className='flex flex-col gap-5'>
                <h2 className='font-bold text-xl md:text-2xl'>Users Dashboard</h2>
                <div className="px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

                    <div
                        onClick={() => navigate('/order')}
                        className="bg-purple-500/90 cursor-pointer hover:bg-purple-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                            Total Orders Placed
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">{loggedUser.ordersData.orders.length}</p>
                    </div>

                    <div
                        onClick={() => navigate('/order')}
                        className="bg-gray-500/90 cursor-pointer hover:bg-gray-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                            Active Orders
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">{getActiveOrders()}</p>
                    </div>

                    <div
                        onClick={() => navigate('/order')}
                        className="bg-green-500/80 cursor-pointer hover:bg-green-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                            Processed Orders
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">{getProcessedOrders()}</p>
                    </div>

                    <div
                        onClick={() => navigate('/order')}
                        className="bg-red-500/90 cursor-pointer hover:bg-red-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                            Cancelled Orders
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">{getCancelledOrders()}</p>
                    </div>

                    <div
                        className="bg-orange-500/90 hover:bg-orange-500 transform hover:scale-105 transition duration-300 text-white flex flex-col items-center gap-2 p-4 rounded-xl shadow-md"
                    >
                        <h2 className="font-semibold text-center text-sm sm:text-base md:text-lg">
                            Total Spent
                        </h2>
                        <p className="font-bold text-lg sm:text-xl">${totalSpent()}</p>
                    </div>
                </div>

            </div>
            {loggedUser.ordersData.orders.length > 0 ? (<div className='flex flex-col gap-5'>

                <h2 className='font-bold text-xl md:text-2xl'>Recent Orders</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">ID</th>
                            <th className="p-2">Item</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Price</th>
                            <th className="p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...loggedUser.ordersData.orders].slice(-5).reverse().map(order => (
                            <tr key={order.id} className="border-b border-gray-500/40">
                                <td className="p-2">{order.id}</td>
                                <td className="p-2">{order.item.name}</td>
                                <td className="p-2">x{order.quantity}</td>
                                <td className="p-2">${order.totalPrice}</td>
                                <td className={`p-2 font-semibold ${order.status == 'processing' ? "text-gray-600" : (order.status == 'processed' ? "text-green-600" : "text-red-600")}`}>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>) : null}




        </section>
    )
}

export default UserDashboard