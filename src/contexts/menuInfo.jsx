import { createContext, useEffect, useRef, useState } from "react";
import { food_list as initialFoodList } from "../assets/frontend_assets/assets";
import { menu_list } from "../assets/frontend_assets/assets";

export const MenuInfoContext = createContext();

export const MenuInfoContextProvider = ({ children }) => {
    const [foodList, setFoodList] = useState([]);
    const [categoryList, setCategoryList] = useState([])
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
        setCategoryList(menu_list)
    }, []);

    const addItem = (item) => {
        const newList = [...foodList, { ...item, id: Number.parseInt(foodList.slice(-1)[0].id) + 1 }];
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
                categoryList,
                food_list: foodList,
            }}
        >
            {children}
        </MenuInfoContext.Provider>
    );
};
