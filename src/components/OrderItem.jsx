import React, { useContext } from 'react'
import { FoodContext } from '../contexts/foodData'

const OrderItem = ({ id, item, totalPrice, quantity, status, userEmail, isAdmin = false }) => {
    const { removeOrderItem } = useContext(FoodContext)
    const handleCancel = () => {
        removeOrderItem(id)
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
                                <div className="px-1 py-1 w-max">
                                    <span className={` ${status == 'processed' && "bg-green-500"} ${status == 'processing' && "bg-gray-500"} ${status == 'cancelled' && "bg-red-500"} text-white px-2 md:px-3 py-1 rounded-md`}>{status}</span></div>
                                {
                                    status == 'processing' && !isAdmin && <td className={`w-max px-1`}>
                                        <span
                                            onClick={handleCancel}
                                            className=' bg-red-500 text-white px-2 md:px-3 py-1 rounded-md cursor-pointer hover:bg-red-600'>
                                            Cancel
                                        </span>
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