import { createContext, useEffect, useState } from "react";
import { food_list as initialFoodList } from "../assets/frontend_assets/assets";

export const MenuInfoContext = createContext();

export const MenuInfoContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("menuData");
        if (storedData) {
            setFoodList(JSON.parse(storedData));
        } else {
            localStorage.setItem("menuData", JSON.stringify(initialFoodList));
            setFoodList(initialFoodList);
        }
    }, []);

    const addItem = (item) => {
        const newList = [...foodList, item];
        setFoodList(newList);
        localStorage.setItem("menuData", JSON.stringify(newList));
    };
    const removeItem = (id) => {
        const newList = foodList.filter((item) => item.id != id)
        setFoodList(newList);
        localStorage.setItem("menuData", JSON.stringify(newList));
    };

    const updateFoodList = (newFoodList) => {
        setFoodList(newFoodList);
        localStorage.setItem("menuData", JSON.stringify(newFoodList));
    };

    const updateFoodListItem = (updatedItem) => {
        const updatedList = foodList.map((item) =>
            item.id === updatedItem.id ? updatedItem : item
        );
        setFoodList(updatedList);
        localStorage.setItem("menuData", JSON.stringify(updatedList));
    };

    return (
        <MenuInfoContext.Provider
            value={{
                addItem,
                removeItem,
                updateFoodList,
                updateFoodListItem,
                food_list: foodList,
            }}
        >
            {children}
        </MenuInfoContext.Provider>
    );
};
