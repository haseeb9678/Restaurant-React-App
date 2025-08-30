import { createContext, useState } from "react";

// Create context
export const UserInfoContext = createContext();

export const InfoContextProvider = ({ children }) => {
    const [user, setUser] = useState([])
    const [logedIn, setLogedIn] = useState(false)
    return (
        <UserInfoContext.Provider value={{ user, setUser, logedIn, setLogedIn }}>
            {children}
        </UserInfoContext.Provider>
    );
};