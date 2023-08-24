import { View, Text, SafeAreaView, KeyboardAvoidingView, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios'

const RegisterScreen = ({ navigation }) => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password
    }

    axios.post("http://localhost:3000/register", user).then((response) => {
      console.log(response)
      Alert.alert("Registration Succesfull", email)
      setName("")
      setEmail("")
      setPassword("")
    }).catch((error) => {
      console.log("Error: ",error)
      Alert.alert("Registration Failed!")
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
          <Text className="font-semibold text-black text-base mt-5">Register To Your Account</Text>
        </View>

        <View className="mt-10">
          <View className="flex flex-row items-center gap-x-2 border-[#D0D0D0] border rounded-md">
            <MaterialIcons
              name='person'
              size={24}
              color={'gray'}
            />
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              className="mx-2.5 w-80 text-base p-2"
              placeholder='enter your Name'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center gap-x-2 border-[#D0D0D0] border rounded-md mt-2">
            <MaterialIcons
              name='email'
              size={24}
              color={'gray'}
            />
            <TextInput
              value={email}
              onChangeText={text => setEmail(text)}
              className="mx-2.5 w-80 text-base p-2 "
              placeholder='enter your Email'
              placeholderTextColor={'gray'}
            />
          </View>

          <View className="flex flex-row items-center gap-x-2 border-[#D0D0D0] border rounded-md mt-2">
            <MaterialIcons
              name='lock'
              size={24}
              color={'gray'}
            />
            <TextInput
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
              className="mx-2.5 w-80 text-base p-2"
              placeholder='enter your Password'
              placeholderTextColor={'gray'}
            />
          </View>

        </View>
        <View className="mt-2">
          <Pressable className="bg-black p-4 mt-10 w-52 ml-auto mr-auto rounded-md" onPress={handleRegister}>
            <Text className="text-center text-white font-bold text-base">Register</Text>
          </Pressable>

          <Pressable className="mt-4" onPress={() => navigation.goBack()}>
            <Text className="text-center text-base">Already have an account? Sign in</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>


    </SafeAreaView>
  )
}

export default RegisterScreen