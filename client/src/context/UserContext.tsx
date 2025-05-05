import React, { createContext, ReactNode, useState } from "react";
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
    const [user, setUser] = useState<User | null>(null);

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