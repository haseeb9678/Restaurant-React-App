import React, { useContext } from 'react'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'

const AdminUpdateQuantity = ({ setShow, item }) => {
    const { food_list, updateFoodListItem } = useContext(MenuInfoContext)
    const foodListItem = food_list.find((f) => f.id == item.id)


    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newQuantity = Number.parseInt(formData.get("quantity"))
        updateFoodListItem({ ...foodListItem, quantity: newQuantity })
        toast.success(
            <p>
                Item
                <span className='font-semibold mx-1'>
                    {foodListItem.name}
                </span>
                quantity updated to x{newQuantity}
            </p>

        )
    }
    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-md md:text-3xl'>Update Item Quantity</h2>
            <div className='flex flex-col items-center sm:flex-row gap-5 bg-gray-400/5 p-4 rounded-xl'>
                <div className='w-full sm:w-35 md:w-50 rounded-lg shadow-sm'>
                    <img src={foodListItem.image} alt={foodListItem.name} className='object-contain w-full h-full rounded-lg' />
                </div>
                <div className='flex flex-col justify-center gap-3'>
                    <h2 className='font-bold text-lg md:text-2xl'>{foodListItem.name}</h2>
                    <h2 className='text-lg'>Quantity: <span className='font-semibold'>x{foodListItem.quantity}</span></h2>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <label htmlFor="quantity" className='flex flex-col sm:items-center gap-3 sm:flex-row'>
                            <p>Enter new Quantity: </p>
                            <input
                                defaultValue={foodListItem.quantity}
                                min={0}
                                max={60}
                                type="number" name="quantity" id="quantity" className='border border-black/30 rounded-md w-40 md:w-50 lg:w-70 px-2 py-1 ' />
                        </label>
                        <button
                            type='submit'
                            className='bg-green-500 text-white w-[50%] px-3 py-1 rounded-xl'>Update</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AdminUpdateQuantity