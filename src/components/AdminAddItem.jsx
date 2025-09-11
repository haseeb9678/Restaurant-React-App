import React, { useContext, useState } from 'react'
import { MenuInfoContext } from '../contexts/menuInfo'
import { toast } from 'react-toastify'

const AdminAddItem = () => {
    const { categoryList, addItem } = useContext(MenuInfoContext)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("Food provides essential nutrients for overall health and well-being")
    const handleAddItem = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")
        const price = Number.parseInt(formData.get("price"))
        const quantity = Number.parseInt(formData.get("quantity"))
        const file = formData.get("image");
        const image = URL.createObjectURL(file);
        const category = formData.get("category")

        const newItem = {
            name,
            price,
            category,
            description,
            quantity,
            image
        }

        setLoading(true)

        setTimeout(() => {
            addItem(newItem)
            setLoading(false)
            toast.success(
                <span>
                    Item <span className='font-bold'>{name}</span> Added
                </span>
            )
            e.target.reset()
            setPreview(null)
        }, 2000)

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <section className='flex flex-col gap-7 overflow-scroll scrollbar-hide'>
            <h2 className='font-bold text-md md:text-3xl'>Add Food Item</h2>
            <form onSubmit={handleAddItem}
                className=' max-w-200 flex flex-col gap-5 w-full sm:w-[70%] md:w-[75%]'
            >
                <div className='flex flex-col gap-5 md:flex-row md:justify-between md:w-full'>
                    <label htmlFor="name" className='w-full'>
                        <input
                            required
                            className='border px-3 py-1 outline-orange-500 border-black/40 rounded-sm h-10 w-full'
                            placeholder='Name'
                            type="text" name="name" id="name" />
                    </label>
                    <label htmlFor="price" className='w-full'>
                        <input
                            required
                            className='border px-3 py-1 outline-orange-500 border-black/40 rounded-sm h-10 w-full'
                            placeholder='Price $'
                            min={1}
                            type="number" name="price" id="price" />
                    </label>
                </div>

                <div className='flex flex-col gap-5 md:flex-row md:justify-between md:w-full'>
                    <label htmlFor="quantity" className='w-full'>
                        <input
                            required
                            className='border px-3 py-1 outline-orange-500 border-black/40 rounded-sm h-10 w-full'
                            placeholder='Quantity'
                            min={0}
                            type="number" name="quantity" id="quantity" />
                    </label>
                    <select
                        required
                        defaultValue={''}
                        className='border px-2 py-1 outline-orange-500 border-black/40 rounded-sm h-10 w-full'
                        name="category" id="category">
                        <option value='' disabled>Select item category</option>
                        {
                            categoryList.map((menu, index) => (
                                <option value={menu.menu_name} key={index}>{menu.menu_name}</option>
                            ))
                        }
                    </select>
                </div>

                <label htmlFor="image" className="w-full cursor-pointer">
                    <div className={`flex flex-col items-center justify-center ${preview && "flex-row gap-7"} border-2 border-dashed border-gray-400 rounded-lg p-4 hover:border-orange-500 transition`}>
                        <div className={`flex flex-col justify-center items-center text-[12px] md:text-lg ${preview && "md:text-md"}`}>
                            <svg
                                className="w-8 h-8 text-gray-500 mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M7 16a4 4 0 01-.88-7.9A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            <p className="text-gray-500">Click to upload image</p>
                        </div>

                        {
                            preview && <img src={preview} alt='preview'
                                className="mt-3 w-20 h-20 object-cover rounded-xl border border-black/50"
                            />
                        }
                    </div>
                    <input
                        required
                        onChange={handleFileChange}
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        className="hidden"
                    />
                </label>

                <label htmlFor="description">
                    <textarea

                        value={description}
                        disabled
                        name='description'
                        className='text-black/50 border px-3 py-1.5 outline-orange-500 border-black/40 rounded-sm w-full'
                        placeholder='Description...'
                        rows={5}
                    ></textarea>
                </label>

                <button
                    type='submit'
                    disabled={loading}
                    className={`flex ${loading ? "cursor-not-allowed bg-orange-400" : "bg-orange-500  hover:bg-orange-600 cursor-pointer"} justify-center items-center  mt-5  text-white rounded-full px-3 py-1 w-20 min-w-max md:px-7 md:py-2`}>
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
                            Adding..
                        </>
                    ) : "Add Item"}
                </button>

            </form>
        </section>
    )
}

export default AdminAddItem