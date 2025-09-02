import React from 'react'

const Contact = () => {
    return (
        <section id='contact' className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-b from-yellow-50 to-white">
            {/* Heading */}
            <div className="max-w-3xl text-center mb-10">
                <h2 className="text-4xl font-bold text-yellow-700 mb-3">Contact Us</h2>
                <p className="text-gray-600 md:text-lg">
                    We’d love to hear from you! Whether it’s feedback, reservations, or just to say hi —
                    Cheesy.com is always here for you.
                </p>
            </div>

            {/* Contact Info & Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
                {/* Contact Info */}
                <div className="flex flex-col space-y-5 p-6 rounded-2xl shadow-md bg-white">
                    <h3 className="text-2xl font-semibold text-yellow-700 mb-2">Get in Touch</h3>
                    <p className="text-gray-600">📍 Location: 123 Cheese Street, Lahore, Pakistan</p>
                    <p className="text-gray-600">📞 Phone: +92 300 1234567</p>
                    <p className="text-gray-600">📧 Email: support@cheesy.com</p>
                    <p className="text-gray-600">⏰ Open Hours: 11:00 AM - 11:00 PM (Mon-Sun)</p>
                </div>

                {/* Contact Form */}
                <form className="flex flex-col space-y-4 p-6 rounded-2xl shadow-md bg-white">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    />
                    <textarea
                        rows="4"
                        placeholder="Your Message"
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        required
                    ></textarea>
                    <button
                        type="submit"
                        className="bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact
