import React from 'react'

const OrderItem = ({ id, item, totalPrice, quantity, status }) => {
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
                            <td className="px-1">Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-1 font-semibold max-w-25">{item.name}</td>
                            <td className="px-1">x{quantity}</td>
                            <td className="px-1">${totalPrice}</td>
                            <td className="px-1 py-1"> <span className='bg-red-500 text-white px-2 md:px-3 py-1 rounded-md'>{status}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OrderItem