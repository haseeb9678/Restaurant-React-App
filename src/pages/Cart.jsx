import React, { useContext, useEffect, useState } from 'react'
import CartItem from '../components/CartItem';
import { UserInfoContext } from '../contexts/userInfo';

const Cart = () => {

    const { loggedUser, loggedIn } = useContext(UserInfoContext)

    return (
        <>
            <section className='px-5'>
                <h2 className='font-bold text-3xl mb-6'>Cart</h2>
                {
                    loggedIn && loggedUser.ordersData.cart.length > 0 ? (
                        <div className='grid grid-cols-1 gap-2'>
                            {
                                loggedUser.ordersData.cart.map((cart_item) => {
                                    return <CartItem
                                        key={cart_item.id}
                                        id={cart_item.id}
                                        item={cart_item.item}
                                        totalPrice={cart_item.totalPrice}
                                        quantity={cart_item.quantity}
                                    />
                                })
                            }
                        </div>
                    ) : (<>
                        <h2 className='text-sm'>Cart is Empty.</h2>
                    </>)
                }
            </section>
        </>
    )
}

export default Cart