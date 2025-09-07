import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets';
import { PiShoppingCart } from "react-icons/pi";
import { FoodContext } from '../contexts/foodData';
import RelatedItems from '../components/RelatedItems';
import { UserInfoContext } from '../contexts/userInfo';
import { toast } from 'react-toastify';
import { MenuInfoContext } from '../contexts/menuInfo';

const OrderItem = () => {
    const [quantity, setQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const [warn, setWarn] = useState(false);
    const [warnMsg, setWarnMsg] = useState('')
    const { addCartItem } = useContext(FoodContext)
    const { loggedIn } = useContext(UserInfoContext)
    const [loading, setLoading] = useState(false)
    const { food_list, updateFoodListItem } = useContext(MenuInfoContext)
    const foodListItem = food_list.find((f) => f.id == location.state.id)

    useEffect(() => {
        setQuantity(0);
        setTotalPrice(0);
        setWarn(false);
    }, [])

    const toogleWarn = () => {
        setWarn(prev => !prev)
    }

    const handleIncrease = () => {
        if (quantity < 10) {
            setQuantity(prev => prev + 1)
            updatePrice('inc')
        }
        if (warn) toogleWarn()

    }

    const handleDecrease = () => {
        if (quantity > 0) {
            setQuantity(prev => prev - 1);
            updatePrice('dec')
        }

        if (warn) toogleWarn()

    }

    const updatePrice = (type) => {
        if (type == 'inc') {
            setTotalPrice(prev => prev + foodListItem.price)
        } else if (type == 'dec') {
            setTotalPrice(prev => prev - foodListItem.price)
        }
    }

    console.log(foodListItem);


    const handleCart = () => {
        if (loggedIn) {
            if (quantity > 0) {
                if (quantity > foodListItem.quantity) {
                    toast.error("Bought Quantity is not available")
                    return
                }
                const newItem = {
                    id: Date.now(),
                    item: foodListItem,
                    quantity: quantity,
                    totalPrice: totalPrice
                }
                setLoading(true)

                setTimeout(() => {
                    addCartItem(newItem)
                    updateFoodListItem({ ...foodListItem, quantity: foodListItem.quantity - quantity })
                    setQuantity(0);
                    setTotalPrice(0);
                    toast.success(
                        <p>
                            Item
                            <span className='font-semibold'> {foodListItem.name} </span>
                            Added to cart
                        </p>

                    )
                    setLoading(false)
                }, 2000)

            } else {
                if (!warn) {
                    toogleWarn();
                    setWarnMsg("Please select quantity*")
                }
            }
        } else {
            if (!warn) {
                toogleWarn()
                setWarnMsg("Please sign-in first")
                toast.error("Please sign in first")
            }
        }
    }

    useEffect(() => {
        if (!warn) {
            setWarnMsg('')
        }
    }, [warn])


    if (!foodListItem) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <h2 className="font-semibold text-gray-500 text-xl md:text-3xl animate-pulse">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <>
            <section className="flex flex-col md:max-w-[838px] md:flex-row gap-5   rounded-2xl p-3 w-[95%] md:w-[95%] mx-auto bg-white">

                {/* Image Section */}
                <div className="flex justify-center items-center md:w-1/2 lg:max-w-[450px]">
                    <img
                        className="rounded-xl max-h-[370px] object-fit w-full"
                        src={foodListItem.image}
                        alt={foodListItem.name}
                    />
                </div>

                {/* Details Section */}
                <div className="flex flex-col justify-between gap-1 md:w-1/2">

                    <div className="flex gap-3 justify-between items-center mb-3">
                        <h2 className="font-bold text-2xl mb-2">{foodListItem.name}</h2>
                        <span>
                            <img
                                src={assets.rating_starts}
                                alt="rating-stars"
                                className="h-6"
                            />
                        </span>
                    </div>
                    <div className='flex flex-col my-2 gap-2'>
                        <p>{foodListItem.description}</p>
                        <span className='font-bold text-3xl text-green-700'>${foodListItem.price}</span>
                    </div>

                    <hr className='border-b-1 border-black/10 my-1' />
                    {
                        foodListItem.quantity > 0 && foodListItem.quantity < 5 && <p className='text-orange-500 text-lg'>Low Stock!</p>
                    }
                    {
                        foodListItem.quantity > 0 ? (
                            <>
                                <div className='flex gap-3 items-center justify-end mb-3'>
                                    <p className='font-semibold text-md text-black/60'>Select Quantity</p>
                                    <div className='flex flex-row-reverse gap-3 items-center bg-white shadow-sm px-3 py-2 rounded-full'>
                                        <button onClick={handleIncrease} className='bg-green-500/70 text-xl text-white font-semibold rounded-full w-10 h-10 cursor-pointer'>+</button>
                                        <p className='font-semibold w-3'>{quantity}</p>
                                        <button onClick={handleDecrease} className='bg-red-500/70 text-xl text-white font-semibold rounded-full w-10 h-10 cursor-pointer'>-</button>
                                    </div>
                                </div>
                                <p className='text-red-500 text-end text-sm h-3 mb-2'>
                                    {
                                        warn ? warnMsg : null
                                    }
                                </p>

                                <button
                                    onClick={handleCart}
                                    disabled={loading}
                                    className={`mt-auto flex justify-center items-center ${loading ? "cursor-not-allowed bg-orange-400" : "bg-orange-500  hover:bg-orange-600 cursor-pointer"} flex gap-2 justify-center items-center text-white px-4 py-2 rounded-xl`}>
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
                                            Adding to Cart
                                        </>
                                    ) : "Add to Cart"}

                                    <PiShoppingCart />
                                    {
                                        totalPrice > 0 && <p>- ${totalPrice}</p>
                                    }

                                </button>
                            </>
                        ) : (
                            <h2 className='text-orange-500 font-bold text-xl sm:text-2xl md:text-3xl'>Out of Stock</h2>
                        )
                    }

                </div>
            </section >

            <RelatedItems item={foodListItem} />
        </>
    );
};

export default OrderItem;
