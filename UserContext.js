const { useState, createContext } = require("react")

const UserType = createContext()
const UserContext = ({ children }) => {
    const [userId, setUserId] = useState("")
    return (
        <UserType.Provider value={{userId, setUserId}}>
            {children}
        </UserType.Provider>
    )
}
export { UserContext, UserType }