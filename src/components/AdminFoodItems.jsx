import React, { useContext } from 'react'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'

const AdminFoodItems = ({ setShow, setItem }) => {

    const { food_list, removeItem } = useContext(MenuInfoContext)

    const handleRemove = (item) => {
        removeItem(item.id)
        toast.success(
            <p>
                Item
                <span className='font-semibold mx-1 text-red-500'>
                    {item.name}
                </span>
                removed
            </p>
        )
    }

    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-md md:text-3xl'>Food Items🍽️</h2>
            <p className='text-end text-lg'>Total Food Items: <span className='font-semibold'>{food_list.length}</span></p>
            <table className="border-collapse w-full text-center text-sm md:text-lg">
                <thead>
                    <tr className="font-bold w-full bg-black/5">
                        <th className="border border-black/15 px-4 py-3">Item Image</th>
                        <th className="border border-black/15 px-4 py-3">Item ID</th>
                        <th className="border border-black/15 px-4 py-3">Item Name</th>
                        <th className="border border-black/15 px-4 py-3">Item Quantity</th>
                        <th className="border border-black/15 px-4 py-3">Item Price</th>
                        <th className="border border-black/15 px-4 py-3">Item Category</th>
                        <th className="border border-black/15 px-4 py-3">Item Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food_list.map((item) => {
                            return <tr key={item.id} className={`${item.quantity == 0 && "text-red-500/80 font-bold"}`}>
                                <td className="border border-black/15 px-2 py-1 text-center">
                                    <img
                                        className="inline-block w-12 h-12 md:w-20 md:h-20 object-cover rounded-full"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </td>
                                <td className="border border-black/15  px-4 py-1">{item.id}</td>
                                <td className="border border-black/15  px-4 py-1">{item.name}</td>
                                <td className="border border-black/15  px-4 py-1">x{item.quantity}</td>
                                <td className="border border-black/15  px-4 py-1">
                                    ${item.price}
                                    <span
                                        className='bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-1 mx-4 rounded-lg'
                                        onClick={() => {
                                            setShow("updateQuantity")
                                            setItem(item)
                                        }}>Update</span>
                                </td>
                                <td className="border border-black/15  px-4 py-1">{item.category}</td>
                                <td className="border border-black/15  px-4 py-1">
                                    <span
                                        className='bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-1 mx-4 rounded-lg'
                                        onClick={() => handleRemove(item)}>Remove</span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default AdminFoodItems