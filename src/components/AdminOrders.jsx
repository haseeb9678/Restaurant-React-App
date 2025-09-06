import React, { useContext, useState } from 'react'
import OrderItem from './OrderItem'
import { UserInfoContext } from '../contexts/userInfo'

const AdminTotalOrders = ({ dashFilter = 'all' }) => {
    const [filterStatus, setFilterStatus] = useState(dashFilter)
    const [recent, setRecent] = useState(true)
    const { users } = useContext(UserInfoContext)

    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-md md:text-3xl'>Orders</h2>
            <form action="" className="w-full flex justify-end mb-5">
                <div className="flex flex-col items-center gap-3 md:flex-row">
                    <label htmlFor="recent" className="font-semibold text-lg text-gray-700">
                        Show Orders:
                    </label>
                    <select
                        onChange={(e) => {
                            setRecent(prev => !prev)
                        }}
                        name="filter"
                        id="filter"
                        defaultValue="recent"
                        className="bg-white border outline-none border-gray-300 w-44 lg:w-60 h-11 rounded-lg px-3 text-gray-700"
                    >
                        <option value="recent">Recent → Oldest</option>
                        <option value="oldest">Oldest → Recent</option>
                    </select>

                    <label htmlFor="filter" className="font-semibold text-lg text-gray-700">
                        Filter Orders By:
                    </label>
                    <select
                        onChange={(e) => {
                            setFilterStatus(e.target.value)
                        }}
                        name="filter"
                        id="filter"
                        defaultValue={filterStatus}
                        className="bg-white border outline-none border-gray-300 w-44 lg:w-60 h-11 rounded-lg px-3 text-gray-700"
                    >
                        <option value="all">All Orders</option>
                        <option value="processing">Processing</option>
                        <option value="processed">Processed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </form>
            {

                users?.map((user) => user.ordersData.orders.length > 0 ? (
                    <div key={user.id} className='grid grid-cols-1 gap-2'>
                        {
                            (recent ? [...user.ordersData.orders] : user.ordersData.orders).reverse().map((order_item) => {
                                if (order_item.status == filterStatus || filterStatus == 'all') {
                                    return <OrderItem
                                        key={order_item.id}
                                        id={order_item.id}
                                        item={order_item.item}
                                        totalPrice={order_item.totalPrice}
                                        quantity={order_item.quantity}
                                        status={order_item.status}
                                        isAdmin={true}
                                        userEmail={user.email}
                                    />
                                }
                            })
                        }
                    </div>
                ) : (<>
                    <h2 className='text-sm'>No order is placed</h2>
                </>)
                )}
        </section>
    )
}

export default AdminTotalOrders