import { createContext, use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        if (!users) {
            setLoggedUser(null)
        }
    }, [users]);

    useEffect(() => {
        if (loggedUser) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [loggedUser])

    const clearAllUsers = () => {
        setUsers([])
    }

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
        setUsers(prev => prev.map((p) => p.id === newUser.id ? newUser : p))

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
                updateUser,
                clearAllUsers
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};
