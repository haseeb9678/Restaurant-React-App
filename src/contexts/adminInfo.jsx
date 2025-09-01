import { createContext, useEffect, useState } from "react";

export const AdminInfoContext = createContext();

export const AdminInfoContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    const [loggedAdmin, setLoggedAdmin] = useState(() => {
        const saved = localStorage.getItem("loggedAdmin");
        return saved ? JSON.parse(saved) : null;
    });

    const [admin, setAdmin] = useState(() => {
        const saved = localStorage.getItem("admin");
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem("loggedAdmin", JSON.stringify(loggedAdmin));
    }, [loggedAdmin]);

    useEffect(() => {
        localStorage.setItem("admin", JSON.stringify({
            id: Date.now(),
            name: "Haseeb Ali",
            password: "Admin@786",
            email: "admin@xyz.com"
        }));
    }, [admin]);

    useEffect(() => {
        if (loggedAdmin) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [loggedAdmin])

    const addLoggedAdmin = () => {
        setLoggedAdmin(admin)
    };

    const removeLoggedAdmin = () => {
        setLoggedAdmin(null);
        setLoggedIn(false);
        localStorage.removeItem("loggedAdmin");
    };

    const updateAdmin = (newAdmin) => {
        setAdmin(newAdmin)
        if (loggedIn && newAdmin.id == loggedAdmin.id) {
            setLoggedAdmin(newAdmin)
        }
    }

    const checkAdminValidity = (adminP) => {
        if (admin.email == adminP.email && admin.password == adminP.password) {
            return true
        }
        return false
    }

    return (
        <AdminInfoContext.Provider
            value={{
                admin,
                loggedAdmin,
                addLoggedAdmin,
                removeLoggedAdmin,
                loggedIn,
                setLoggedIn,
                checkAdminValidity,
                updateAdmin
            }}
        >
            {children}
        </AdminInfoContext.Provider>
    );
};
