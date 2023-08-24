import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from 'jwt-decode'
import { UserType } from '../UserContext'
import axios from 'axios'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useFocusEffect } from '@react-navigation/native'


const HomeScreen = () => {
  const { userId, setUserId } = useContext(UserType)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken")
      const decodedToken = jwtDecode(token)
      const userId = decodedToken.userId
      setUserId(userId)
    }
    fetchUsers()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = axios.get("http://localhost:3000/get-posts")
      setPosts((await response).data)
    } catch (error) {
      console.log("Error fetching posts", error)
    }
  }
  console.log("posts: ", posts)

  //sayfadaki verilerin uygulamadan çıkmadan gelmesi
  useFocusEffect(
    useCallback(() => {
      fetchPosts()
    }, [])
  )

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleLike = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:3000/post/${postId}/${userId}/like`)
      const updatedPost = response.data
      const updatedPosts = posts?.map(post => 
        post?._id === updatedPost._id ? updatedPost : post
      )
      setPosts(updatedPosts)
    } catch (error) {
      console.log("Error liking the post", error)
    }
  }

  const handleDislike = async (postId) => {
    try {
      const response = await axios.put(`http://localhost:3000/post/${postId}/${userId}/unlike`)
      const updatedPost = response.data
      const updatedPosts = posts?.map(post => 
        post?._id === updatedPost._id ? updatedPost : post
      )
      setPosts(updatedPosts)
    } catch (error) {
      console.log("Error liking the post", error)
    }
  }

  return (
    <SafeAreaView className="bg-white flex-1 ">
      <View className="items-center mt-5 ">
        <Image width={60} height={40} resizeMode='contain'
          source={{ uri: "https://freelogopng.com/images/all_img/1688663386threads-logo-transparent.png" }}
        />
      </View>
      <ScrollView className="bg-white">
        <View className="mt-1">
          {posts?.map((post) => (
            <View className="p-2 border-t border-[#D0D0D0] flex flex-row" key={post._id}>
              <Image width={40} height={40} resizeMode='contain'
                source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png" }}
              />
              <View className="flex mx-3">
                <Text className="text-black mb-1 font-semibold text-base">{post?.user?.name}</Text>
                <Text className="text-black">{post?.content}</Text>
                <View className="flex flex-row gap-2 items-center mt-2">
                  {post?.likes?.includes(userId) ? (
                    <AntDesign
                      name="heart"
                      size={18}
                      color="red"
                      onPress={() => handleDislike(post?._id)}

                    />
                  ) : (
                    <AntDesign
                      name="hearto"
                      size={18}
                      color="black"
                      onPress={() => handleLike(post?._id)}
                    />
                  )}
                  <FontAwesome name="comment-o" size={18} />
                  <Ionicons name="share-social-outline" size={18} />
                </View>
                <Text className="text-gray-500 mt-1">{post?.likes?.length} likes · {post?.replies?.length} replies</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default HomeScreen
