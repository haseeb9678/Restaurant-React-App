import { createContext, useEffect, useState } from "react";

export const UserInfoContext = createContext();

export const InfoContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [loggedUser, setLoggedUser] = useState(() => {
        const saved = localStorage.getItem("loggedUser");
        return saved ? JSON.parse(saved) : null;
    });

    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("users");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    }, [loggedUser]);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        if (loggedUser) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [loggedUser])

    const addLoggedUser = (newUser) => {
        const found = findUser(newUser)
        if (found) {
            setLoggedUser(found);
        }
    };

    const removeLoggedUser = () => {
        setLoggedUser(null);
        setLoggedIn(false);
        localStorage.removeItem("loggedUser");
    };

    const addUsers = (newUser) => {
        setUsers((prev) => [...prev, newUser]);
        setLoggedUser(newUser)
        setLoggedIn(true)
    };

    const updateUser = (newUser) => {
        setUsers((prev) =>
            prev.map((u) => u.id === newUser.id ? newUser : u)
        );
        if (loggedIn && newUser.id == loggedUser.id) {
            setLoggedUser(newUser)
        }
    }

    const findUser = (user) => {
        return users.find((prev) => prev.email == user.email && prev.password == user.password)
            || null
    }

    return (
        <UserInfoContext.Provider
            value={{
                users,
                addUsers,
                loggedUser,
                addLoggedUser,
                removeLoggedUser,
                loggedIn,
                setLoggedIn,
                findUser,
                updateUser
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};
