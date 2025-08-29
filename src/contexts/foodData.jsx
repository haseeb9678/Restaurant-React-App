import { createContext, useState } from "react";

// Create context
export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('');

    const [orderItems, setOrderItems] = useState([]);

    return (
        <FoodContext.Provider value={{ activeCategory, setActiveCategory, orderItems, setOrderItems }}>
            {children}
        </FoodContext.Provider>
    );
};