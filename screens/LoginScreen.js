import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigation = useNavigation()

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken")
        if (token) {
          setTimeout(() => {
            navigation.replace("Main")
          }, 400)
        }
      } catch (error) {
        console.log("Error:",error)
      }
    }
    checkLoginStatus()
  }, [])

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    }
    //localhost:3000 => 10.0.2.2:3000
    axios.post("http://localhost:3000/login", user).then((response) => {
      console.log(response)
      const token = response.data.token
      AsyncStorage.setItem("authToken", token)
      navigation.navigate("Main")
    }).catch((error) => {
      console.log("Network Error", error)
      Alert.alert("Login Error", "Network Error")
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center">
      <View>
        <Image
          tintColor={'black'}
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Threads_%28app%29_logo.svg/2048px-Threads_%28app%29_logo.svg.png' }}
          width={150} height={100} resizeMode="contain"
        />
      </View>
      <KeyboardAvoidingView className="items-center justify-center">
        <View>
          <Text className="font-semibold text-black text-base mt-5">Login To Your Account</Text>
        </View>
        <View className="mt-10 mx-8">
          <View className="flex flex-row items-center mx-2 border-[#D0D0D0] border rounded-md pl-2">
            <MaterialIcons
              name='email'
              size={24}
              color={'gray'}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              className="mx-2.5 w-80 text-base p-2"
              placeholder='enter your Email'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center mx-2 border-[#D0D0D0] border rounded-md my-2 pl-2">
            <MaterialIcons
              name='lock'
              size={24}
              color={'gray'}
            />
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              className="mx-2.5 p-2 w-80 text-base h-auto flex"
              placeholder='enter your Password'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center justify-between mx-2">
            <Text>Keep me logged in</Text>
            <Text className="font-medium text-[#007FFF]">Forgot Password</Text>
          </View>


        </View>
        <View className="mt-7">
          <Pressable className="bg-black p-4 mt-10 w-52 ml-auto mr-auto rounded-md" onPress={handleLogin}>
            <Text className="text-center text-white font-bold text-base">Login</Text>
          </Pressable>

          <Pressable className="mt-4" onPress={() => navigation.navigate("Register")}>
            <Text className="text-center text-base">Don't have an account? Sign up</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

export default LoginScreen