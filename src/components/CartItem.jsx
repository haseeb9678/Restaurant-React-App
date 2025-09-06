import React, { useContext, useEffect } from 'react'
import { FoodContext } from '../contexts/foodData'
import { UserInfoContext } from '../contexts/userInfo'
import { toast } from 'react-toastify'

const CartItem = ({ id, item, totalPrice, quantity }) => {
    const { addOrderItem, removeCartItem } = useContext(FoodContext)
    const { loggedIn } = useContext(UserInfoContext)

    const handleCheckout = () => {
        if (loggedIn) {
            const newOrderItem = {
                id,
                item,
                totalPrice,
                quantity,
                status: 'processing'
            }
            // update FoodContext order state
            addOrderItem(newOrderItem)
            toast.success(
                <span>
                    Item <span className="font-bold text-green-600">{item.name}</span> checked out 🛒
                </span>
            );
        }
    }

    const handleRemove = () => {
        removeCartItem(id)
        toast.success(
            <span>
                Item <span className="font-bold text-green-600">{item.name}</span> removed ❌
            </span>
        );
    }


    return (
        <div className="bg-gray-100/20 w-full mx-auto max-w-[1300px] p-4 border border-black/10 rounded-md flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
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
                            <td className="px-1 w-60">Item</td>
                            <td className="px-1 w-max">Qty</td>
                            <td className="px-1 w-max">Amount</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-1 font-semibold max-w-25">{item.name}</td>
                            <td className="px-1 w-max">x{quantity}</td>
                            <td className="px-1 w-max">${totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex gap-3 w-full md:w-auto mt-3 md:mt-0">
                <button onClick={handleCheckout} className="flex-1 cursor-pointer md:flex-none px-3 py-2 bg-green-500 text-white text-center rounded-lg text-sm hover:bg-green-600">
                    Checkout
                </button>
                <button onClick={handleRemove} className="flex-1 cursor-pointer md:flex-none px-3 py-2 bg-red-500 text-white text-center rounded-lg text-sm hover:bg-red-600">
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
