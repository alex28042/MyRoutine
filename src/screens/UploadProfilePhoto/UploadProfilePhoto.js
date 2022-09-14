import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import ButtonContinue from '../../components/Login/ButtonContinue'
import { TouchableOpacity } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { db, st } from '../../../firebase-config'
import storage from '../../navigation/Storage'



const UploadProfilePhoto = () => {
  const [image,setImage] = useState(null)
  const [uid, setUid] = useState(null)
  const [email, setEmail] = useState(null)
  const getUserEmail = async() => await setEmail(await storage.get("email"))

  const getUserUid = async() => {
    if (uid == null) {
      getUserEmail()
      db.collection("Users").where('email', '==', email).get().then(q => {
        q.forEach(d => {
          setUid(d.id)
        })
      })
    }
  }
  
  getUserUid()

  const pickImage = async () => {   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
   
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      console.log(uid)
      const response = await fetch(result.uri)
      const blob = await response.blob()
      const filename = result.uri.substring(result.uri.lastIndexOf('/') + 1)
      await st.ref().child(filename).put(blob)
      await db.doc("Users/" + uid).update({
        profilePhoto: filename
      })
      console.log(filename)
    }
  };


  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="text-center text-4xl margin mt-36 mb-20 ml-8 mr-8">Upload profile Photo</Text>
        <View className="bg-white h-40 w-40 rounded-full mb-10 items-center justify-center">
          {image !== null ? <Image source={{uri: image}} className="h-40 w-40 rounded-full"/> : <Ionicons name='person-outline' size={60}/> }
        </View>
        <TouchableOpacity onPress={pickImage} className="bg-white border-2 px-7 py-3 rounded-full">
          <Text>
            Upload Photo
          </Text>
        </TouchableOpacity>
        <Text className="mt-5">Optional</Text>
        <Image source={{uri: image}} />
        <ButtonContinue continueTo={"HomeScreen"} />
      </View>
    </TailwindProvider>
  )
}

export default UploadProfilePhoto