import React, { useContext, useEffect, useState } from 'react'
import { FoodContext } from '../contexts/foodData'
import { food_list } from '../assets/frontend_assets/assets';
import FoodItemCard from './FoodItemCard';

const FoodItems = () => {
    const { activeCategory, setActiveCategory } = useContext(FoodContext);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {

        let newData;

        if (activeCategory == '') {
            setFilteredData(food_list)
            newData = food_list;
        } else {
            setFilteredData(food_list.filter((item) => item.category == activeCategory));
            newData = food_list.filter((item) => item.category == activeCategory);
        }

        console.log(newData);

    }, [activeCategory])

    return (
        <>
            <h2 className='font-bold text-2xl mb-2'>{activeCategory == '' ? 'Top dishes near you' : `${activeCategory}`}</h2>
            <section className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {
                    filteredData.map((item, index) => {
                        console.log(item.name);

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