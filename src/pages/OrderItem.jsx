import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets';

const OrderItem = () => {
    const [item, setItem] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const location = useLocation();

    useEffect(() => {
        setItem(location.state || null);
    }, [location.state]);

    const handleIncrease = () => {
        if (quantity < 10)
            setQuantity(prev => prev + 1);
    }

    const handleDecrease = () => {
        if (quantity > 0)
            setQuantity(prev => prev - 1);
    }

    if (!item) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <h2 className="font-semibold text-gray-500 text-xl md:text-3xl animate-pulse">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <section className="flex flex-col md:flex-row gap-5  rounded-2xl p-3 w-[95%] md:w-[70%] lg:w-[60%] mx-auto bg-white">

            {/* Image Section */}
            <div className="flex justify-center items-center md:w-1/2">
                <img
                    className="rounded-xl max-h-[370px] object-fit w-full"
                    src={item.image}
                    alt={item.name}
                />
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between gap-1 md:w-1/2">

                <div className="flex gap-3 justify-between items-center mb-3">
                    <h2 className="font-bold text-2xl mb-2">{item.name}</h2>
                    <span>
                        <img
                            src={assets.rating_starts}
                            alt="rating-stars"
                            className="h-6"
                        />
                    </span>
                </div>
                <div className='flex flex-col my-2'>
                    <p>{item.description}</p>
                    <span className='font-bold text-2xl text-green-700'>${item.price}</span>
                </div>

                <div className='flex gap-3 items-center justify-end mb-3'>
                    <p className='font-semibold text-md text-black/60'>Select Quantity</p>
                    <div className='flex gap-3 items-center bg-white shadow-sm px-3 py-2 rounded-full'>
                        <button onClick={handleIncrease} className='bg-green-500/70 text-xl font-semibold rounded-full w-9 h-9 cursor-pointer'>+</button>
                        <p className='font-semibold w-3'>{quantity}</p>
                        <button onClick={handleDecrease} className='bg-red-500/70 text-xl font-semibold rounded-full w-9 h-9 cursor-pointer'>-</button>
                    </div>
                </div>

                <button className="mt-auto bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition">
                    Add to Cart
                </button>
            </div>
        </section>
    );
};

export default OrderItem;
