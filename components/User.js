import { View, Text, Image, Pressable } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext'

const User = ({ item }) => {
    const { userId, setUserId } = useContext(UserType)
    const [requestSent, setRequestSend] = useState(false)

    const sendFollow = async (currentUserId, selectedUserId) => {
        try {
            const response = await fetch("http://localhost:3000/follow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ currentUserId, selectedUserId })
            })
            if (response.ok) {
                setRequestSend(true)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    const handleUnfollow = async (targetId) => {
        try {
            const response = await fetch("http://localhost:3000/users/unfollow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ loggedInUserId: userId, targetUserId: targetId })
            })
            if (response.ok) {
                setRequestSend(false)
                console.log("Unfollowing Succesfull")
            }
        } catch (error) {
            console.log("Error: ", error)
        }
    }
    return (
        <View>
            <View className="flex flex-row items-center justify-between gap-2.5">
                <Image width={40} height={40} resizeMode='contain' className="rounded-md"
                    source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png" }} />
                <Text className="flex-1 text-base font-[500] text-black">{item?.name}</Text>
                {requestSent || item?.followers?.includes(userId) ? (
                    <Pressable
                        className="border border-[#D0D0D0] p-1.5 ml-2.5 w-24 rounded-lg"
                        onPress={() => handleUnfollow(item?._id)}
                    >
                        <Text className="text-center text-base font-bold text-black">Following</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        className="border border-[#D0D0D0] p-1.5 ml-2.5 w-24 rounded-lg"
                        onPress={() => sendFollow(userId, item._id)}>
                        <Text className="text-center text-base font-bold text-black">Follow</Text>
                    </Pressable>
                )}

            </View>

        </View>
    )
}

export default User