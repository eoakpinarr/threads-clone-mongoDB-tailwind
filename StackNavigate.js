import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Entypo from "react-native-vector-icons/Entypo"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import ThreadsScreen from './screens/ThreadsScreen'
import ActivityScreen from './screens/ActivityScreen'
import ProfileScreen from './screens/ProfileScreen'
const StackNavigate = () => {

    const Stack = createNativeStackNavigator()
    const Tab = createBottomTabNavigator()

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Entypo name="home" size={20} color={"black"}/>
                        ) : (
                            <AntDesign name="home" size={20} color={"black"}/>
                        )
                    }}
                />

                <Tab.Screen
                    name='Threads'
                    component={ThreadsScreen}
                    options={{
                        tabBarLabel: "Threads",
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="create" size={20} color={"black"}/>
                        ) : (
                            <Ionicons name="create-outline" size={20} color={"black"}/>

                        )
                    }}
                />

                <Tab.Screen
                    name='Activity'
                    component={ActivityScreen}
                    options={{
                        tabBarLabel: "Create",
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused, color }) => focused ? (
                            <AntDesign name="heart" size={20} color={"black"} />

                        ) : (
                            <AntDesign name="hearto" size={20} color={"black"}/>

                        )
                    }}
                />

                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: "black" },
                        headerShown: false,
                        tabBarIcon: ({ focused }) => focused ? (
                            <Ionicons name="person" size={20} color={"black"}/>
                        ) : (
                            <Ionicons name="person-outline" size={20} color={"black"}/>
                        )
                    }}
                />

            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Main' component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigate  