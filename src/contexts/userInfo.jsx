import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserInfoContext = createContext();

export const InfoContextProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("users");
        return saved ? JSON.parse(saved) : [];
    });

    let loggedUser = users.find((u) => u.loggedIn) || null;
    const loggedIn = !!loggedUser;

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
        loggedUser = users.find((u) => u.loggedIn) || null;
    }, [users]);


    const logInUser = (id) => {
        setUsers((prev) =>
            prev.map((p) => (p.id === id ? { ...p, loggedIn: true } : p))
        );
    };

    const removeLoggedUser = () => {
        setUsers((prev) => prev.map((p) => ({ ...p, loggedIn: false })));
    };

    const addUsers = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
    };

    const updateUser = (newUser) => {
        setUsers((prev) => prev.map((p) => (p.id === newUser.id ? newUser : p)));
    };

    const findUser = (user) =>
        users.find((prev) => prev.email === user.email && prev.password === user.password) ||
        null;

    const clearAllUsers = () => setUsers([]);

    return (
        <UserInfoContext.Provider
            value={{
                users,
                addUsers,
                loggedUser,
                loggedIn,
                findUser,
                updateUser,
                clearAllUsers,
                removeLoggedUser,
                logInUser,
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};

