import { createContext, useEffect, useRef, useState } from "react";
import { food_list as initialFoodList } from "../assets/frontend_assets/assets";

export const MenuInfoContext = createContext();

export const MenuInfoContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState([]);
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const searchInput = useRef(null)

    useEffect(() => {
        if (search) {
            const newList = foodList.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
            setSearchList(newList)
        } else {
            setSearchList(foodList)
        }

    }, [search])

    const clearSearch = () => {
        setSearch('')
        if (searchInput)
            searchInput.current.value = ''
    }

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

    const setDefaultMenu = () => {
        localStorage.setItem("menuData", JSON.stringify(initialFoodList));
        setFoodList(initialFoodList);
    }


    return (
        <MenuInfoContext.Provider
            value={{
                addItem,
                removeItem,
                search,
                setSearch,
                searchList,
                searchInput,
                clearSearch,
                updateFoodList,
                updateFoodListItem,
                setDefaultMenu,
                food_list: foodList,
            }}
        >
            {children}
        </MenuInfoContext.Provider>
    );
};
