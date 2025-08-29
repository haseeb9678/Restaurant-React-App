import React, { useContext } from 'react'
import { FoodContext } from '../contexts/foodData'
import OrderItem from '../components/OrderItem';

const Order = () => {
    const { orderItems, setOrderItems } = useContext(FoodContext);

    return (
        <>
            <section className='px-5'>
                <h2 className='font-bold text-3xl mb-6'>Order Items</h2>
                {
                    orderItems.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {
                                orderItems.map((order_item) => {
                                    return <OrderItem
                                        key={order_item.id}
                                        id={order_item.id}
                                        item={order_item.item}
                                        totalPrice={order_item.totalPrice}
                                        quantity={order_item.quantity}
                                        status={order_item.status}
                                    />
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