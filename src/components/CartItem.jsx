import React, { useContext, useEffect } from 'react'
import { FoodContext } from '../contexts/foodData'
import { UserInfoContext } from '../contexts/userInfo'

const CartItem = ({ id, item, totalPrice, quantity }) => {
    const { orderItems, addOrderItem, cartItems, removeCartItem } = useContext(FoodContext)
    const { loggedIn, loggedUser, updateUser } = useContext(UserInfoContext)

    const handleCheckout = () => {
        if (loggedIn) {
            const newOrder = {
                id,
                item,
                totalPrice,
                quantity,
                status: 'processing'
            }

            // update FoodContext order state
            addOrderItem(newOrder)

            // update user data
            const updatedUser = {
                ...loggedUser,
                ordersData: {
                    cart: cartItems.filter(c => c.id !== id),
                    orders: [...(loggedUser.ordersData?.orders || []), newOrder]
                }
            }

            updateUser(updatedUser)
            removeCartItem(id)
        }
    }


    return (
        <div className="bg-gray-100/20 w-full mx-auto max-w-[1300px] p-4 border border-black/10 rounded-md flex flex-col md:flex-row gap-4 md:gap-3 items-start md:items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-black/50">
                            <td className="px-1">Item</td>
                            <td className="px-1">Qty</td>
                            <td className="px-1">Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-1 font-semibold max-w-25">{item.name}</td>
                            <td className="px-1">x{quantity}</td>
                            <td className="px-1">${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex gap-3 w-full md:w-auto mt-3 md:mt-0">
                <button onClick={handleCheckout} className="flex-1 md:flex-none px-3 py-2 bg-green-500 text-white text-center rounded-lg text-sm hover:bg-green-600">
                    Checkout
                </button>
                <button onClick={() => removeCartItem(id)} className="flex-1 md:flex-none px-3 py-2 bg-red-500 text-white text-center rounded-lg text-sm hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
