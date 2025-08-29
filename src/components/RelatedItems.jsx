import React, { useContext, useEffect } from 'react'
import FoodItems from '../components/FoodItems'
import { FoodContext } from '../contexts/foodData'

const RelatedItems = ({ item }) => {
    const { activeCategory, setActiveCategory } = useContext(FoodContext);

    useEffect(() => {
        setActiveCategory(item.category)
    }, [item])

    return (
        <section className='my-5 md:my-8'>
            <FoodItems item={item} />
        </section>
    )
}

export default RelatedItems