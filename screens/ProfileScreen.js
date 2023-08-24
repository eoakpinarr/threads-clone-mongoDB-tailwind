import { View, Text, SafeAreaView, Image, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({navigation}) => {

    const [user, setUser] = useState("")
    const { userId, setUserId } = useContext(UserType)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/profile/${userId}`)
                const { user } = response.data
                setUser(user)
            } catch (error) {
                console.log("Error", error)
            }
        }
        fetchProfile()
    }, [])

    const Logout = () => {
        clearAuthToken()
    }
        const clearAuthToken = async() => {
            await AsyncStorage.removeItem("authToken")
            console.log("Cleared auth token")
            navigation.replace("Login")
    }
    
    return (
        <SafeAreaView className="flex-1">
            <View className="mt-14 p-4">
                <View className="flex flex-row items-center gap-2.5">
                    <Text className="text-xl font-semibold">{user?.name}</Text>
                    <View className="py-2 px-1.5 rounded-lg bg-[#D0D0D0]">
                        <Text>Threads.net</Text>
                    </View>
                </View>
                <View className="flex flex-row items-center gap-3 mt-4 justify-between">
                    <View>
                        <Text className="text-sm font-semibold">Computer Engineer</Text>
                        <Text className="text-sm font-semibold">React Native Developer</Text>
                    </View>
                    <View className="mr-2">
                        <Image width={60} height={60} resizeMode='contain'
                            source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png" }}
                        />
                    </View>
                </View>
                <Text className="text-gray-500 font-normal">{user?.followers?.length} followers</Text>
                <View className="flex flex-row items-center gap-2.5">
                    <Pressable
                        className="flex-1 items-center justify-center p-2.5 border border-[#D0D0D0] rounded-md"
                        onPress={null}
                    >
                        <Text>Edit Profile</Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 items-center justify-center p-2.5 border border-[#D0D0D0] rounded-md"
                        onPress={Logout}
                    >
                        <Text>Logout</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProfileScreen