import React, { useContext, useState, useEffect } from 'react'
import { FoodContext } from '../contexts/foodData'
import OrderItem from '../components/OrderItem';
import { UserInfoContext } from '../contexts/userInfo';

const Order = () => {
    const { loggedUser, loggedIn } = useContext(UserInfoContext)
    const [filterStatus, setFilterStatus] = useState('all')
    return (
        <>
            <section className='px-2 flex flex-col gap-3'>
                <h2 className='font-bold text-3xl mb-6'>Order Items</h2>
                <form action="" className="w-full flex justify-end mb-5">
                    <div className="flex items-center gap-3">
                        <label htmlFor="filter" className="font-semibold text-lg text-gray-700">
                            Filter Orders By:
                        </label>
                        <select
                            onChange={(e) => {
                                setFilterStatus(e.target.value)
                            }}
                            name="filter"
                            id="filter"
                            defaultValue="all"
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
                    loggedIn && loggedUser.ordersData.orders.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {
                                loggedUser.ordersData.orders.map((order_item) => {
                                    if (order_item.status == filterStatus || filterStatus == 'all') {
                                        return <OrderItem
                                            key={order_item.id}
                                            id={order_item.id}
                                            item={order_item.item}
                                            totalPrice={order_item.totalPrice}
                                            quantity={order_item.quantity}
                                            status={order_item.status}
                                        />
                                    }
                                })
                            }
                        </div>
                    ) : (<>
                        <h2 className='text-sm'>No order is placed</h2>
                    </>)
                }
            </section>
        </>
    )
}

export default Order