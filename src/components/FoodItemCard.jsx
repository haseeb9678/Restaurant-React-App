import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { useNavigate } from 'react-router-dom'
import { MenuInfoContext } from '../contexts/menuInfo'

const FoodItemCard = ({ item }) => {

    const navigate = useNavigate()
    const [click, setClick] = React.useState(false)
    const { clearSearch } = useContext(MenuInfoContext)

    const toogleClick = () => {
        setClick(prev => !prev)
    }

    React.useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [click])

    return (
        <div
            className='flex flex-col min-w-50 max-w-95 cursor-pointer hover:bg-gray-300/30 transform hover:scale-102 transition duration-300  bg-gray-300/5 shadow-xl rounded-sm my-2 pb-3 md:max-w-100 lg:max-w-85'
            onClick={() => {
                navigate('/orderItem', { state: item })
                clearSearch()
                toogleClick()
            }}
        >

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
            {
                item.quantity == 0 && <div className='flex justify-center'>
                    <span className='text-white text-center bg-orange-500 w-[50%] py-1 rounded-lg'>Out of Stock</span>
                </div>
            }

        </div>
    )
}

export default FoodItemCard