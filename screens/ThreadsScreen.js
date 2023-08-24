import { View, Text, SafeAreaView, Image, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext'
import axios from 'axios'

const ThreadsScreen = () => {

  const [content, setContent] = useState("")
  const { userId, setUserId } = useContext(UserType)

  const handlePostSubmit = () => {
    const postData = {
      userId,
    }

    if (content) {
      postData.content = content
    }
    axios.post("http:/localhost:3000/create-post", postData)
      .then((response) => {
        setContent("")
      }).catch((error) => {
        console.log("Error creating post", error)

      })
  }
  return (
    <SafeAreaView className="">
      <View className="flex flex-row items-center  gap-2.5 p-2.5">
        <Image width={40} height={40} resizeMode='contain' className="rounded-sm"
          source={{ uri: "https://cdn-icons-png.flaticon.com/128/149/149071.png" }}
        />
        <Text className="text-black">ThreadsScreen</Text>
      </View>
      <View className="flex flex-row p-2 bg-white">
        <TextInput
          className="p-2.5"
          value={content} multiline
          onChangeText={(text) => setContent(text)}
          placeholder='Type your message...'
          placeholderTextColor={"black"}
        />
      </View>
      <View className="mt-10 flex flex-row items-center justify-center">
        <Button onPress={handlePostSubmit} color={'red'} title='Share Post'></Button>
      </View>
    </SafeAreaView>
  )
}

export default ThreadsScreen