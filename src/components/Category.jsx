import React from 'react'
import { menu_list } from '../assets/frontend_assets/assets'

const Category = () => {
    return (
        <section className='w-full overflow-x-scroll flex gap-5'>
            {
                menu_list.map((menu, index) => {
                    return <div key={index} className='flex flex-col gap-3 items-center justify-center'>
                        <div className='w-28 border-2 border-black/10 rounded-full p-1'>
                            <img className='w-full' src={menu.menu_image} alt={menu.menu_name} />
                        </div>
                        <div className='font-semibold'>{menu.menu_name}</div>
                    </div>
                })
            }
        </section>
    )
}

export default Category