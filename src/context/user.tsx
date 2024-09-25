import { createContext, type ReactNode, useContext, useState } from "react"
import type { userTypes } from "../types/user"

type UserTypeProps = {
    user: userTypes | undefined
    create: (user: userTypes) => void
}


export const UserContext = createContext({} as UserTypeProps)

type UserContextProviderProps = {
    children: ReactNode
}

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<userTypes>();

    function create(user: userTypes) {
        setUser(user)
    }

    return (
        <UserContext.Provider value={{ user, create }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);
