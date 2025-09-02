import React from 'react'

const About = () => {
    return (
        <section id='about' className="w-full py-16 px-6 md:px-20 bg-gradient-to-b from-yellow-50 to-white">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                    About <span className="text-yellow-600">Cheesy.com</span>
                </h1>
                <p className="text-gray-600 md:text-lg leading-relaxed mb-6">
                    Welcome to <span className="font-semibold">Cheesy.com</span> — a place where passion for
                    delicious food meets comfort and happiness. Since opening our doors in <span className="font-semibold">2023</span>,
                    we’ve been serving fresh, cheesy meals that bring friends and families together.
                </p>
                <p className="text-gray-600 md:text-lg leading-relaxed mb-6">
                    Our mission is simple: <span className="italic">to turn every bite into a happy moment</span>.
                    Whether you’re craving cheesy pizzas, creamy pastas, or fresh bites made with love,
                    we’ve got you covered. We believe food isn’t just about taste — it’s about
                    creating memories.
                </p>
                <p className="text-gray-600 md:text-lg leading-relaxed">
                    At <span className="font-semibold">Cheesy.com</span>, every dish is prepared with the freshest
                    ingredients, a sprinkle of creativity, and lots of love ❤️. Join us and be part of
                    our cheesy journey!
                </p>
            </div>
        </section>
    )
}

export default About
