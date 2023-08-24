import { View, Text } from 'react-native'
import React from 'react'
import StackNavigate from './StackNavigate'
import { UserContext } from './UserContext'

const App = () => {
    return (
        <>
            <UserContext>
                <StackNavigate />
            </UserContext>

        </>
    )
}

export default App