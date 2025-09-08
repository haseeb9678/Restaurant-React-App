import React, { useContext, useEffect, useState } from 'react'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'
import AdminValidatePassword from './AdminValidatePassword'

const AdminUpdateItem = ({ item }) => {
    const { food_list, updateFoodListItem } = useContext(MenuInfoContext)
    const foodListItem = food_list.find((f) => f.id == item.id)
    const [validate, setValidate] = useState(false)
    const [showPasswordComp, setShowPasswordComp] = useState(false)
    const [newQuantity, setNewQuantity] = useState(0)
    const [newPrice, setNewPrice] = useState(0)


    useEffect(() => {
        if (validate) {
            updateFoodListItem({ ...foodListItem, price: newPrice, quantity: newQuantity })
            setShowPasswordComp(false)
            toast.success(
                <p>
                    Item
                    <span className='font-semibold mx-1'>
                        {foodListItem.name}
                    </span>
                    updated
                </p>
            )
        }
        setValidate(false)

    }, [validate])

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newQuantity = Number.parseInt(formData.get("quantity"))
        const newPrice = Number.parseInt(formData.get("price"))
        setNewPrice(newPrice)
        setNewQuantity(newQuantity)
        setShowPasswordComp(true)
    }
    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-lg md:text-3xl'>Update Item</h2>
            <div className='shadow-xl flex flex-col items-start max-w-180  sm:flex-row gap-5 bg-gray-400/5 p-4 rounded-xl'>
                <div className='w-full sm:w-35 sm:max-h-30 md:w-50 rounded-lg shadow-sm'>
                    <img src={foodListItem.image} alt={foodListItem.name} className='object-contain w-full h-full rounded-lg' />
                </div>
                <div className='flex flex-col gap-3 w-full'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='font-bold text-xl md:text-2xl'>{foodListItem.name}</h2>
                        <h2 className='text-md md:text-lg'>Quantity: <span className='font-semibold text-xl text-gray-600'>x{foodListItem.quantity}</span></h2>
                        <h2 className='text-md md:text-lg'>Price: <span className='font-semibold text-xl text-green-700'>${foodListItem.price}</span></h2>
                    </div>

                    {
                        foodListItem.quantity == 0 ? (
                            <p className='text-lg font-bold text-red-500'>
                                🚫 Out of Stock
                            </p>
                        ) : foodListItem.quantity <= 10 ? (
                            <p className='text-lg text-orange-500'>
                                ⚠️ Low Stock
                            </p>
                        ) : null
                    }
                    <hr className='border-b-1 border-black/40' />

                    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                        <label htmlFor="price" className='flex flex-col sm:items-center gap-3 sm:flex-row'>
                            <p className='w-40'>Enter new Price($): </p>
                            <input
                                defaultValue={foodListItem.price}
                                min={0}
                                max={60}
                                type="number" name="price" id="price" className='border border-black/30 rounded-md w-[70%] px-2 py-1 ' />
                        </label>
                        <label htmlFor="quantity" className='flex flex-col sm:items-center gap-3 sm:flex-row'>
                            <p className='w-40'>Enter new Quantity: </p>
                            <input
                                defaultValue={foodListItem.quantity}
                                min={0}
                                max={60}
                                type="number" name="quantity" id="quantity" className='border border-black/30 rounded-md w-[70%] px-2 py-1 ' />
                        </label>
                        <button
                            type='submit'
                            className='bg-green-500 cursor-pointer hover:bg-green-600 text-white w-[50%] px-3 py-1 rounded-xl'>Update</button>
                    </form>
                </div>
            </div>
            {
                showPasswordComp && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[4px]">
                        <div className="bg-white rounded-2xl shadow-lg p-6 w-[90%] max-w-md relative">
                            <button
                                onClick={() => setShowPasswordComp(false)}
                                className="absolute cursor-pointer top-2 right-4 text-gray-500 hover:text-black text-xl"
                            >
                                ✖
                            </button>
                            <div className='flex justify-center'>
                                <AdminValidatePassword setValidate={setValidate} />
                            </div>
                        </div>
                    </div>
                )
            }
        </section>
    )
}

export default AdminUpdateItem