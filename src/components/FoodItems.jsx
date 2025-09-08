import React, { useContext, useEffect, useState } from 'react'
import { FoodContext } from '../contexts/foodData'
import FoodItemCard from './FoodItemCard';
import { MenuInfoContext } from '../contexts/menuInfo';

const FoodItems = ({ item }) => {
    const { activeCategory, setActiveCategory } = useContext(FoodContext);
    const { food_list, search, searchList } = useContext(MenuInfoContext);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (search) {
            setFilteredData(searchList)
            setActiveCategory('')
            return
        }
        if (activeCategory == '') {
            setFilteredData(food_list)
        } else {
            setFilteredData(food_list.filter((item) => item.category == activeCategory));
            if (item) {
                setFilteredData(prev => prev.filter((itm) => itm.id != item.id))
            }
        }

    }, [activeCategory, item, food_list, search])

    return (
        <>
            <h2 className='font-bold text-xl mb-3 md:text-2xl'>{
                search ? (<>
                    Search
                    <span className='text-orange-500 text-2xl md:text-3xl'> "{search}"</span>

                </>) : (
                    activeCategory == '' ? 'Top dishes near you' : (
                        <>
                            {item ? 'Related ' : null}
                            <span className={`${item ? 'text-orange-500 text-2xl md:text-3xl' : ''}`}>{activeCategory}</span>
                            {item ? ' items' : null}

                        </>))

            }

            </h2 >
            <section className='grid grid-cols-1 gap-5 justify-items-center md:justify-items-start md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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