import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { UserType } from '../UserContext'
import User from '../components/User'

const ActivityScreen = () => {

  const [selectedButton, setSelectedButton] = useState("people")
  const [content, setContent] = useState("People Content")
  const [users, setUsers] = useState([])
  const { userId, setUserId } = useContext(UserType)

  const handleButtonClick = (button) => {
    setSelectedButton(button)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken")
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)

      axios.get(`http://localhost:3000/user/${userId}`).then((response) => {
        setUsers(response.data)
      }).catch((error) => {
        console.log("Error: ", error)

      })
    }
    console.log(users)
    fetchUsers()
  }, [])

  console.log("Users", users)

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-2.5">
          <Text className="text-lg font-bold text-black mt-2">Activity</Text>
          <View className="flex flex-row items-center gap-2.5 mt-3">
            <TouchableOpacity
              onPress={() => handleButtonClick("people")}
              className={`flex-1 py-2.5 px-5 border-[0.7px] border-[#D0D0D0] rounded-md 
              ${selectedButton === "people" ? "bg-black" : "bg-white"}`}
            >
              <Text className={`text-center font-bold ${selectedButton === "people" ? "text-white" : "text-black"}`}>People</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonClick("all")}

              className={`flex-1 py-2.5 px-5 border-[0.7px] border-[#D0D0D0] rounded-md 
              ${selectedButton === "all" ? "bg-black" : "bg-white"}`}
            >
              <Text className={`text-center font-bold ${selectedButton === "all" ? "text-white" : "text-black"}`}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleButtonClick("requests")}
              className={`flex-1 py-2.5 px-5 border-[0.7px] border-[#D0D0D0] rounded-md 
              ${selectedButton === "requests" ? "bg-black" : "bg-white"}`}
            >
              <Text className={`text-center font-bold ${selectedButton === "requests" ? "text-white" : "text-black"}`}>Requests</Text>
            </TouchableOpacity>
          </View>
          <View>
            {selectedButton === "people" && (
              <View className="mt-5">
                {users?.map((item, index) => (
                  <User key={index} item={item} />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default ActivityScreen