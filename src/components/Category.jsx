import React, { useContext } from 'react'
import { menu_list } from '../assets/frontend_assets/assets'
import { FoodContext } from '../contexts/foodData'

const Category = () => {
    const { activeCategory, setActiveCategory } = useContext(FoodContext);

    // handle click and double click
    const handleClick = (menuName) => {
        if (activeCategory === menuName) {
            setActiveCategory(''); // double click = deselect
        } else {
            setActiveCategory(menuName); // single click = set active
        }
    };

    return (
        <>
            <h2 className='font-bold text-2xl'>Food Categories</h2>
            <p className="text-gray-600 mb-4">
                Explore a variety of delicious options – from quick snacks to full meals,
                pick your favorite category and start your order.
            </p>

            <section className='w-full overflow-x-scroll flex gap-5'>
                {menu_list.map((menu, index) => (
                    <div
                        key={index}
                        className='flex flex-col gap-3 items-center justify-center cursor-pointer'
                        onClick={() => handleClick(menu.menu_name)}
                    >
                        <div
                            className={`w-30 border-3 rounded-full p-1 md:w-40
                ${activeCategory === menu.menu_name
                                    ? 'border-orange-500'
                                    : 'border-black/10'
                                }`}
                        >
                            <img
                                className='w-full'
                                src={menu.menu_image}
                                alt={menu.menu_name}
                            />
                        </div>
                        <div className='font-semibold'>{menu.menu_name}</div>
                    </div>
                ))}
            </section>
        </>
    )
}

export default Category
