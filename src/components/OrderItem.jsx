import React, { useContext, useState } from 'react'
import { FoodContext } from '../contexts/foodData'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'

const OrderItem = ({ id, item, totalPrice, quantity, status, userEmail, isAdmin = false }) => {
    const { removeOrderItem } = useContext(FoodContext)
    const { food_list, updateFoodListItem } = useContext(MenuInfoContext)
    const foodListItem = food_list.find((f) => f.id == item.id)
    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        setLoading(true)
        setTimeout(() => {
            removeOrderItem(id)
            updateFoodListItem({ ...foodListItem, quantity: foodListItem.quantity + quantity })
            toast.success(
                <p>
                    Item
                    <span className='text-red-500 font-semibold'>{item.name}</span>
                    cancelled
                </p>
            )
            setLoading(false)
        }, 2000)
    }

    return (
        <div className={` ${status == 'cancelled' ? 'bg-red-400/5' : 'bg-gray-100/20'} ${status == 'processed' ? 'bg-green-500/5' : ''} w-full mx-auto max-w-[1300px] p-4 border border-black/10 rounded-md flex flex-col md:flex-row gap-4 md:gap-3 items-start md:items-center`}>
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
                            <td className="px-1 w-60">Order ID</td>
                            {isAdmin && <td className="px-1 w-60">User Email</td>}
                            <td className="px-1 w-60">Item</td>
                            <td className="px-1 w-max">Qty</td>
                            <td className="px-1 w-max">Amount</td>
                            <td className="px-1 w-max">Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className={`px-1  w-max`}>{id}</td>
                            {isAdmin && <td className="px-1 w-60">{userEmail}</td>}
                            <td className={`px-1 ${status == 'cancelled' ? "line-through decoration-2" : ""} font-semibold max-w-25`}>{item.name}</td>
                            <td className={`px-1 ${status == 'cancelled' ? "line-through decoration-2" : ""} w-max`}>x{quantity}</td>
                            <td className={`px-1 ${status == 'cancelled' ? "line-through decoration-2" : ""} w-max`}>${totalPrice}</td>
                            <td className='flex gap-4 items-center'>
                                <div className="px-1 py-1 w-max flex flex-col gap-1">
                                    <span className={` ${status == 'processed' && "bg-green-500"} ${status == 'processing' && "bg-gray-500"} ${status == 'cancelled' && "bg-red-500"} text-white px-2 md:px-3 py-1 rounded-md`}>
                                        {status} </span>
                                    {
                                        status == 'cancelled' && <p className='text-md text-red-800'>By Admin*</p>
                                    }
                                </div>
                                {
                                    status == 'processing' && !isAdmin && <td className={`w-max px-1`}>
                                        <button
                                            onClick={handleCancel}
                                            disabled={loading}
                                            className={`mt-auto flex justify-center items-center ${loading ? "cursor-not-allowed bg-red-400" : "bg-red-500  hover:bg-red-600 cursor-pointer"} flex gap-2 justify-center items-center text-white px-2 md:px-3 py-1 rounded-md`}>
                                            {loading ? (
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
                                                    Cancelling..
                                                </>
                                            ) : "Cancel"}

                                        </button>
                                    </td>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderItem