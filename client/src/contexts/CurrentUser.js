import { createContext, useState } from 'react'
import { useEffect } from 'react'

export const CurrentUser = createContext()

export default function CurrentUserProvider({children}){

    const [currentUser, setCurrentUser] = useState(null)
    useEffect(() => {
        async function getLoggedInUser() {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}authentication/profile`, {
                credentials: 'include'
            })
            let user = await response.json()
            setCurrentUser(user)
        }
        getLoggedInUser()
    },[])

    window.setCurrentUser = setCurrentUser


    return(
        <CurrentUser.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </CurrentUser.Provider>
    )
}