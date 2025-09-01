import { createContext, useEffect, useState } from "react";

// Create context
export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('');

    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("cartItems")
        return saved ? JSON.parse(saved) : []
    });

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    }, [cartItems])

    const addCartItem = (newItem) => {
        setCartItems(prev => [...prev, newItem])
    }

    const removeCartItem = (id) => {
        const updatedData = cartItems.filter((prev) => prev.id != id)
        setCartItems(updatedData)
    }

    const [orderItems, setOrderItems] = useState(() => {
        const saved = localStorage.getItem("orderItems")
        return saved ? JSON.parse(saved) : []
    });

    useEffect(() => {
        localStorage.setItem("orderItems", JSON.stringify(orderItems))
    }, [orderItems])

    const addOrderItem = (newItem) => {
        setOrderItems(prev => [...prev, newItem])
    }

    const removeOrderItem = (id) => {
        const updatedData = orderItems.filter((prev) => prev.id != id)
        setOrderItems(updatedData)
    }


    return (
        <FoodContext.Provider value={{
            activeCategory,
            setActiveCategory,
            orderItems,
            addOrderItem,
            removeOrderItem,
            setOrderItems,
            cartItems,
            addCartItem,
            removeCartItem,
            setCartItems
        }}>
            {children}
        </FoodContext.Provider>
    );
};