import React, { createContext, ReactNode, useState, useEffect } from "react";
import { User } from "../interfaces/User";

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = (props: UserProviderProps) => {
    const [user, setUserState] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserState(JSON.parse(storedUser));
        }
    }, []);

    const setUser = (user: User | null) => {
        setUserState(user);
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    };

    const value: UserContextType = {
        user,
        setUser,
        isAuthenticated: !!user,
    }

    return (
        <UserContext.Provider value={
            value
        }>
            {props.children}
        </UserContext.Provider>
    )
}