import React, { useContext, useEffect, useState } from 'react'
import { FoodContext } from '../contexts/foodData'
import { food_list } from '../assets/frontend_assets/assets';
import FoodItemCard from './FoodItemCard';

const FoodItems = ({ item }) => {
    const { activeCategory, setActiveCategory } = useContext(FoodContext);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {

        if (activeCategory == '') {
            setFilteredData(food_list)
        } else {
            setFilteredData(food_list.filter((item) => item.category == activeCategory));
            if (item) {
                setFilteredData(prev => prev.filter((itm) => itm.id != item.id))
            }
        }

    }, [activeCategory, item])

    return (
        <>
            <h2 className='font-bold text-xl mb-2 md:text-2xl'>{

                activeCategory == '' ? 'Top dishes near you' : (
                    <>
                        {item ? 'Related ' : null}
                        <span className={`${item ? 'text-orange-500 text-2xl md:text-3xl' : ''}`}>{activeCategory}</span>
                        {item ? ' items' : null}

                    </>)

            }

            </h2>
            <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    filteredData.map((item, index) => {

                        return <FoodItemCard
                            key={index}
                            item={item}
                        />
                    })
                }
            </section>

        </>
    )
}

export default FoodItems