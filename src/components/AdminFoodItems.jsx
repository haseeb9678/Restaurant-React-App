import React from 'react'
import { food_list } from '../assets/frontend_assets/assets';

const AdminFoodItems = () => {

    return (
        <section className='flex flex-col gap-7'>
            <h2 className='font-bold text-xl md:text-2xl'>Food Items</h2>
            <table className="border-collapse w-full text-center">
                <thead>
                    <tr className="font-bold w-full bg-black/5">
                        <th className="border border-black/15 px-2 py-1">Item Image</th>
                        <th className="border border-black/15 px-2 py-1">Item ID</th>
                        <th className="border border-black/15 px-2 py-1">Item Name</th>
                        <th className="border border-black/15 px-2 py-1">Item Price</th>
                        <th className="border border-black/15 px-2 py-1">Item Category</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        food_list.map((item) => {
                            return <tr key={item.id}>
                                <td className="border border-black/15 px-2 py-1 text-center">
                                    <img
                                        className="inline-block w-12 h-12 md:w-20 md:h-20 object-cover rounded-full"
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </td>
                                <td className="border border-black/15 px-2 py-1">{item.id}</td>
                                <td className="border border-black/15 px-2 py-1">{item.name}</td>
                                <td className="border border-black/15 px-2 py-1">${item.price}</td>
                                <td className="border border-black/15 px-2 py-1">{item.category}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </section>
    )
}

export default AdminFoodItems