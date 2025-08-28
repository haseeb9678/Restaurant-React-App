import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const FoodItemCard = ({ item }) => {

    return (
        <div className='flex flex-col min-w-50 max-w-110 bg-gray-300/5 shadow-lg rounded-sm my-2 pb-3 md:max-w-100 lg:max-w-85'>

            <div className='h-[70%] overflow-hidden'>
                <img className='h-full w-full object-cover rounded-t-sm' src={item.image} alt={item.name} />
            </div>
            <div className='p-5 flex flex-col items-start justify-center gap-4'>
                <div className='flex justify-between items-center w-full'>
                    <h2 className='font-bold text-lg text-black/70'>{item.name}</h2>
                    <span><img src={assets.rating_starts} alt="rating-stars" /></span>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>{item.description}</p>
                    <span className='font-bold text-2xl text-orange-400'>${item.price}</span>
                </div>
            </div>

        </div>
    )
}

export default FoodItemCard