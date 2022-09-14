import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { auth } from '../../../firebase-config'
import storage from '../../navigation/Storage'

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const onHandleLogin = async () => {
    if (email !== "" && password !== "") {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => { 
          console.log("Login success")
          storage.set("email", email)
          storage.set("password", password)
          navigation.navigate("HomeScreen") 
      })
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="text-4xl margin mt-36 mb-20">Login</Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} placeholder={"Email"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2"/>
        <TextInput secureTextEntry value={password} onChangeText={text => setPassword(text)} placeholder={"Password"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2"/>
        <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
          <Text className="underline">Forgot Password?</Text>
        </TouchableOpacity>
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={onHandleLogin}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default LoginScreen