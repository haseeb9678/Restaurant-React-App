import React, { useContext, useEffect, useState } from 'react'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'
import AdminValidatePassword from './AdminValidatePassword'
import { SlInfo, SlMagnifier } from "react-icons/sl";

const AdminFoodItems = ({ setShow, setItem }) => {

    const { food_list, removeItem, setDefaultMenu } = useContext(MenuInfoContext)
    const [showPasswordComp, setShowPasswordComp] = useState(false)
    const [validate, setValidate] = useState(false)
    const [action, setAction] = useState('')
    const [selectedItem, setSelectedItem] = useState()
    const [filteredList, setFilteredList] = useState(food_list)

    const openVerfiyModal = (action, item = null) => {
        setAction(action)
        setSelectedItem(item)
        setShowPasswordComp(true)
    }

    const handleChange = (e) => {
        const value = e.currentTarget.value
        const newList = food_list.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.id.includes(value))
        setFilteredList(newList)
    }


    useEffect(() => {
        if (validate) {
            if (action == 'defaultMenu') {
                setDefaultMenu()
                toast.success(
                    <span>
                        Menu is set to Default
                    </span>
                )
            } else if (action == 'remove' && selectedItem) {
                handleRemove(selectedItem)
            }
            setValidate(false)
            setShowPasswordComp(false)
        }
    }, [validate])

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
            <div className='flex flex-col gap-3 xl:flex-row xl:justify-between xl:items-center'>
                <p className='text-start text-lg'>Total Food Items: <span className='font-semibold'>{food_list.length}</span></p>
                <form>
                    <label htmlFor="search" className='flex flex-row-reverse w-full md:w-90 lg:w-90 justify-between items-center bg-gray-500/10 h-10 rounded-md px-3 md:px-5'>
                        <input
                            onChange={(e) => handleChange(e)}
                            className='bg-transparent border-none outline-none w-full'
                            type="text" name="search" id="search"
                            placeholder='Search item by name or id' />
                        <span className='mr-3 border-r-2 text-lg text-black/70 border-r-black/10 h-full flex items-center pr-3'><SlMagnifier /></span>
                    </label>
                </form>
            </div>


            <table className="border-collapse w-full text-center text-sm md:text-lg">
                <thead>
                    <tr className="font-bold w-full bg-black/5">
                        <th className="border border-black/15 px-4 py-3">Item Image</th>
                        <th className="border border-black/15 px-4 py-3">Item ID</th>
                        <th className="border border-black/15 px-4 py-3">Item Name</th>
                        <th className="border border-black/15 px-4 py-3">Item Quantity</th>
                        <th className="border border-black/15 px-4 py-3">Item Price</th>
                        <th className="border border-black/15 px-4 py-3">Item Category</th>
                        <th className="border border-black/15 px-4 py-3">Item Update</th>
                        <th className="border border-black/15 px-4 py-3">Item Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredList.map((item) => {
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
                                <td className="border border-black/15  px-4 py-1">
                                    <div className='flex flex-col gap-2 justify-center'>
                                        <span>x{item.quantity}</span>
                                        {
                                            item.quantity == 0 ? (
                                                <p>🚫 Out of Stock</p>
                                            ) : item.quantity <= 10 ? (
                                                <p className='text-orange-500 text-md'>⚠️ Low Stock</p>
                                            ) : null
                                        }
                                    </div>
                                </td>
                                <td className="border border-black/15  px-4 py-1">
                                    ${item.price}
                                </td>
                                <td className="border border-black/15  px-4 py-1">{item.category}</td>
                                <td className="border border-black/15  px-4 py-1">
                                    <span
                                        className='bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-1 mx-4 rounded-lg'
                                        onClick={() => {
                                            setShow("updateItem")
                                            setItem(item)
                                        }}>Update</span>
                                </td>

                                <td className="border border-black/15  px-4 py-1">
                                    <span
                                        className='bg-red-500 hover:bg-red-600 cursor-pointer text-white px-4 py-1 mx-4 rounded-lg'
                                        onClick={() => openVerfiyModal("remove", item)}>Remove</span>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <div>
                <button
                    onClick={() => openVerfiyModal("defaultMenu")}
                    className='bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-3 py-2 rounded-xl shadow-sm'>Make Default Food Items</button>
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

export default AdminFoodItems