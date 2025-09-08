import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/foodData'
import { UserInfoContext } from '../contexts/userInfo'
import { toast } from 'react-toastify'
import { MenuInfoContext } from '../contexts/menuInfo'

const CartItem = ({ id, item, totalPrice, quantity }) => {
    const { addOrderItem, removeCartItem } = useContext(FoodContext)
    const { food_list, updateFoodListItem } = useContext(MenuInfoContext)
    const { loggedIn } = useContext(UserInfoContext)
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    const [loadingRemove, setLoadingRemove] = useState(false)

    const foodListItem = food_list.find((f) => f.id == item.id)

    const handleCheckout = () => {
        if (loggedIn) {
            const newOrderItem = {
                id,
                item,
                totalPrice,
                quantity,
                status: 'processing'
            }

            setLoadingCheckout(true)
            setTimeout(() => {
                addOrderItem(newOrderItem)
                toast.success(
                    <span>
                        Item <span className="font-bold text-green-600">{item.name}</span> checked out 🛒
                    </span>
                );
                setLoadingCheckout(false)
            }, 2000)

        }
    }

    const handleRemove = () => {
        setLoadingRemove(true)
        setTimeout(() => {
            removeCartItem(id)
            updateFoodListItem({ ...foodListItem, quantity: foodListItem.quantity + quantity })
            toast.success(
                <span>
                    Item <span className="font-bold text-green-600">{item.name}</span> removed ❌
                </span>
            );
            setLoadingRemove(false)
        }, 2000)

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

                <button
                    disabled={loadingCheckout}
                    onClick={handleCheckout}
                    className={`flex-1 flex justify-center items-center ${loadingCheckout ? "cursor-not-allowed bg-green-400" : "bg-green-500  hover:bg-green-600 cursor-pointer"}  md:flex-none px-3 py-2 0 text-white text-center rounded-lg text-sm`}>
                    {loadingCheckout ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            CheckingOut..
                        </>
                    ) : "CheckOut"}
                </button>
                <button
                    disabled={loadingRemove}
                    onClick={handleRemove}
                    className={`flex-1 flex justify-center items-center ${loadingRemove ? "cursor-not-allowed bg-red-400" : "bg-red-500  hover:bg-red-600 cursor-pointer"}  md:flex-none px-3 py-2 0 text-white text-center rounded-lg text-sm`}>
                    {loadingRemove ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Removing..
                        </>
                    ) : "Remove"}
                </button>

            </div>
        </div>
    )
}

export default CartItem
