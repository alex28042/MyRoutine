import { View, Text, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { Ionicons } from '@expo/vector-icons'
import EditProfileButton from '../../components/SettingsComponents/EditProfileButton'
import ButtonSettings from '../../components/SettingsComponents/ButtonSettings'
import { useState } from 'react'
import { db, st } from '../../../firebase-config'
import storage from '../../navigation/Storage'
import { useEffect } from 'react'

const SettingsScreen = () => {
  const [email, setEmail] = useState('')
  const [profilePhotourl, setProfilePhotourl] = useState('null')
  const [userData, setUserData] = useState(null)
  const [uid, setUid] = useState(null)
  const [loading, setloading] = useState(true)

  
  const getNameUser = async() => {
    if (userData == null) {
      await setEmail(await storage.get("email"))
      await db.collection('Users').where('email', '==', email).get().then(query => {
        query.forEach(query1 => {
          const data = query1.data()
          setUserData(data)
          setUid(query1.id)
        })
      })
    }
  }
  
  const func = async () => {
    if (profilePhotourl === 'null') {
      await st.ref(userData ? userData.profilePhoto : '').getDownloadURL().then((x) => {
        setProfilePhotourl(x)
      })
      setloading(false)
    } 
  } 

  getNameUser();
  func()

  if (loading) {
    return (
      <TailwindProvider>
        <View className="bg-emerald-400" style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={40} color={'white'}/>
        </View>
      </TailwindProvider>
    )
  }

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <View className="h-24 w-24 rounded-full border-2 mr-2 justify-center items-center bg-white mt-10">
            {profilePhotourl !== '' ? <Image source={{uri: profilePhotourl}} className="rounded-full h-24 w-24" />  : <Ionicons name='person-outline' size={30} />}
          </View>
          <Text className="text-lg mt-4 mb-4">{userData ? userData.name : null}</Text>
          <EditProfileButton />
          <ButtonSettings />
        </View>
    </TailwindProvider>
  )
}

export default SettingsScreen