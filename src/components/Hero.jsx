import React from 'react'
import { menu_list, assets, header_assets } from '../assets/frontend_assets/assets'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Hero = () => {
    const scrollIntoCategory = () => {
        const section = document.getElementById("category");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <header
            onClick={scrollIntoCategory}
            className='h-[37vh] w-full md:h-[42vh] lg:h-[50vh]'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2000, disableOnInteraction: true }}
                loop={true}
                className='h-full w-full'
            >
                {header_assets.map((image, index) => (
                    <SwiperSlide key={index} className='h-full w-full cursor-pointer'>
                        <img
                            className='h-full w-full object-cover'
                            src={image}
                            alt={`header-${index}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </header>
    )
}

export default Hero