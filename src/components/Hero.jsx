import React from 'react'
import { menu_list, assets } from '../assets/frontend_assets/assets'

const Hero = () => {
    return (
        <header
            style={{ backgroundImage: `url(${assets.header_img})` }}
            className="h-[34vw] md:h-[27vw] bg-no-repeat bg-cover bg-center relative"
        >
        </header>

    )
}

export default Hero