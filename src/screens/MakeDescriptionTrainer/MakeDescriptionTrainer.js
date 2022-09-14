import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TextInput } from 'react-native'
import ButtonContinue from '../../components/Login/ButtonContinue'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { useNavigation } from '@react-navigation/native'
import { db } from '../../../firebase-config'

const MakeDescriptionTrainer = () => {
  const [Bio, SetBio] = useState('')
  const [uid, setUid] = useState(null)
  const [Email, setEmail] = useState('')
  const navigation = useNavigation();
  const getUser = async() => {
    let a = await storage.get("email")
    setEmail(a)
  }

  getUser();

  const getUserId = () => {
    db.collection('Users').where('email', '==', Email).get().then(query => {
      query.forEach(doc => {
        setUid(doc.id)
        console.log(uid)
      })
    })
  }

  getUserId();

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="text-center text-4xl margin mt-36 mb-20 ml-8 mr-8">Make your description as a trainer</Text>
        <TextInput value={Bio} onChangeText={(text) => SetBio(text)} placeholder='Write bio' className="bg-white rounded-2xl border-2 w-72 h-64 mb-32 px-3"/>
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => {navigation.navigate("UploadProfilePhoto"), db.doc("Users/" + uid).update({bio: Bio}, storage.set("bio", Bio))}}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default MakeDescriptionTrainer