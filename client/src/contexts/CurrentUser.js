import { createContext, useState } from 'react'

export const CurrentUser = createContext()

export default function CurrentUserProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    window.setCurrentUser = setCurrentUser
    return(
        <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUser.Provider>
    )
}d