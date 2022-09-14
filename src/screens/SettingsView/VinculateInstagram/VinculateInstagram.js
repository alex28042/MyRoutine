import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonSave from '../../../components/Lenguage/ButtonSave'
import { TextInput } from 'react-native'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { db } from '../../../../firebase-config'
import storage from '../../../navigation/Storage'
import { useNavigation } from '@react-navigation/native'

const VinculateInstagram = () => {
  const [Instagram, SetInstagram] = useState(null)
  const [Email, SetEmail] = useState('')
  const [uid, setUid] = useState('')
  const navigation = useNavigation()
  const getUser = async() => {
    let a = await storage.get("email")
    SetEmail(a)
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
          <Text className="mt-44 text-xl">Write your @ of instagram</Text>
          <TextInput value={Instagram} onChangeText={text => SetInstagram(text)} placeholder='Write instagram name' className="bg-white mt-20 h-14 w-3/4 rounded-full border-2 px-3"/>
          <View className="flex-1 justify-end items-center mb-14 mt-14">
            <TouchableOpacity className="bg-white h-10 w-24 border-2 items-center justify-center rounded-full absolute bottom-0" onPress={() => {navigation.navigate("SettingsScreen"), db.collection('Users').doc(uid).update({instagram: Instagram})}}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
    </TailwindProvider>
  )
}

export default VinculateInstagram