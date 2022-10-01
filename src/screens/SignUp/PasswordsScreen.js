import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { useNavigation } from '@react-navigation/native'
import { auth, db } from '../../../firebase-config'
import storage from '../../navigation/Storage'

const PasswordsScreen = ({route}) => {
  const {email, username} = route.params
  const [password, setPassword] = useState('')
  const [comfirmpassword, setComfirmPassword] = useState('')
  const navigation = useNavigation()

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && password == comfirmpassword) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signup success')
        storage.set("email", email)
        storage.set("password", password)
        db.collection('Users').add({
          email: email,
          name: username,
          bio: "",
          profilePhoto: "",
          subcriptions: 0,
          moneySubcriptions: 0,
          instagram: "",
          Lenguage: "Spanish",
          promotion: false,        
        })
        console.log(email)
        console.log(password)
        navigation.navigate("MakeDescriptionTrainer")
      })
    } else if(email === '' || password == '') console.log("email y password kk")
  };

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="mt-20 mb-20 text-2xl">Enter Password</Text>
            <TextInput secureTextEntry value={password}  onChangeText={text => setPassword(text)} placeholder={"Password"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
            <TextInput secureTextEntry placeholder={"Repeat Password"} onChangeText={text => setComfirmPassword(text)} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
            <View className="flex-1 items-center justify-end mb-14 mt-14">
                <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => onHandleSignup()}>
                    <Text>
                    Continue
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </TailwindProvider>
  )
}

export default PasswordsScreen