import { View, Text, Alert } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { useState } from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { auth, db } from '../../../firebase-config'
import storage from '../../navigation/Storage'
import { useNavigation } from '@react-navigation/native'


const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comfirmpassword, setComfirmPassword] = useState('')
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

  const onHandleSignup = () => {
    if (email !== '' && password !== '' && password == comfirmpassword && existsUserName(userName) != true) {
      auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signup success')
        storage.set("email", email)
        storage.set("password", password)
        db.collection('Users').add({
          email: email,
          name: userName,
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
      .catch((err) => Alert.alert("Signup error", err.message));
    } else if (existsUserName(userName)) console.log("existe")
    else if(email === '' || password == '') console.log("email y password kk")
  };
  
  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="text-4xl margin mt-36 mb-20">SignUp</Text>
        <TextInput value={userName}  onChangeText={text => setUserName(text)} placeholder={"Username"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <TextInput value={email}  onChangeText={text => setEmail(text)} placeholder={"Email"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <TextInput secureTextEntry value={password}  onChangeText={text => setPassword(text)} placeholder={"Password"} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <TextInput secureTextEntry placeholder={"Repeat Password"} onChangeText={text => setComfirmPassword(text)} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2" />
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={onHandleSignup}>
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