import { createContext, useContext, useState } from "react";
import { UserInfoContext } from "./userInfo";

// Create context
export const FoodContext = createContext();

export const FoodContextProvider = ({ children }) => {
    const { users, loggedUser, updateUser } = useContext(UserInfoContext)
    const [activeCategory, setActiveCategory] = useState('');

    const addCartItem = (newItem) => {
        const newUserData = { ...loggedUser, ordersData: { ...loggedUser.ordersData, cart: [...loggedUser.ordersData.cart, newItem] } }
        updateUser(newUserData)
        console.log("added cart item");
    }

    const removeCartItem = (id) => {
        const newUserData = { ...loggedUser, ordersData: { ...loggedUser.ordersData, cart: loggedUser.ordersData.cart.filter((prev) => prev.id != id) } }
        updateUser(newUserData)
        console.log("remove cart item");

    }
    const addOrderItem = (newItem) => {
        const newUserData = { ...loggedUser, ordersData: { cart: loggedUser.ordersData.cart.filter((prev) => prev.id != newItem.id), orders: [...loggedUser.ordersData.orders, newItem] } }
        updateUser(newUserData)
        console.log("added order item");
    }

    const removeOrderItem = (id) => {
        const newUserData = { ...loggedUser, ordersData: { ...loggedUser.ordersData, orders: loggedUser.ordersData.orders.filter((prev) => prev.id != id) } }
        updateUser(newUserData)
        console.log("removed order item");
    }

    return (
        <FoodContext.Provider value={{
            activeCategory,
            setActiveCategory,
            addOrderItem,
            removeOrderItem,
            addCartItem,
            removeCartItem,
        }}>
            {children}
        </FoodContext.Provider>
    );
};