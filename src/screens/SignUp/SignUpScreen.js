import { View, Text, Alert } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { auth, db } from '../../../firebase-config'
import { useNavigation } from '@react-navigation/native'


const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const navigation = useNavigation()

  const existsUserName = (username) => {
    let userfound = false;
    
    db.collection("Users/").get().then(q => {
      q.forEach(d => {
        const data = d.data()
        if (data.name == userName) userfound = true
      })
    })

    return userfound
  }

  const continueButton = () => {
    if (email != '' && userName != '' && !existsUserName(userName)) {
      navigation.navigate("PasswordsScreen", {email: email, username: userName})
    }
  }

  
  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="text-4xl margin mt-36 mb-20">SignUp</Text>
        <TextInput value={userName}  onChangeText={text => setUserName(text)} placeholder={"Username"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <TextInput value={email}  onChangeText={text => setEmail(text)} placeholder={"Email"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => continueButton()}>
            <Text>
            Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default SignUpScreen