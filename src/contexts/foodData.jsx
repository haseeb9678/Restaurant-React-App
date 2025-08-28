import { createContext, useState } from "react";

// Create context
export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState('');

    return (
        <FoodContext.Provider value={{ activeCategory, setActiveCategory }}>
            {children}
        </FoodContext.Provider>
    );
};