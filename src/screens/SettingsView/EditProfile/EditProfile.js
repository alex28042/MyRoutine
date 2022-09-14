import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'
import ButtonSave from '../../../components/Lenguage/ButtonSave'
import { useState } from 'react'
import { db, st } from '../../../../firebase-config'
import * as ImagePicker from 'expo-image-picker';
import React from 'react'
import storage from '../../../navigation/Storage'
import { useNavigation } from '@react-navigation/native'


const EditProfile = () => {
  const [Email, setEmail] = useState('')
  const [Bio, setBio] = useState('')
  const [profilePhotourl, setProfilePhotourl] = useState('null')
  const [Image, setImage] = useState('')
  const [uid, setUid] = useState('')
  const [userData, setUserdata] = useState(null)
  const getEmail =  async() => setEmail(await storage.get("email"))
  const navigation = useNavigation()
  
  getEmail()

  const getNameUser = async() => {
    if (userData == null) {
      await db.collection('Users').where('email', '==', Email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          setUserdata(data)
          setUid(d.id)
        })
      })
    }
  }
  
  getNameUser();

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
      db.doc("Users/" + uid).update({
        profilePhoto: filename
      })
      await st.ref(filename).put(blob)
    }
  };

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <View className="flex flex-row mt-20">
            <View className="bg-white h-20 w-20 justify-center items-center mr-8  rounded-full border-2">
              {profilePhotourl !== 'null' ? <Image source={{uri: profilePhotourl}} className="rounded-full h-20 w-20" />  : <Ionicons name='person-outline' size={30} />}
            </View>
            <View className="flex flex-col">
              <Text className="ml-3">@{userData ? userData.name : ''}</Text>
              <TouchableOpacity className="bg-white h-10 w-32 items-center mt-3 justify-center rounded-full border-2">
                <Text>Change Photo</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput defaultValue={Bio} onChangeText={(text) => setBio(text)} placeholder='Write other bio' className="bg-white h-64 w-3/5 rounded-lg px-2 border-2 mt-28" />
          <View className="flex-1 items-center justify-end mb-14 mt-14">
            <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => navigation.navigate("ProfileScreen")}>
              <Text>
              Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </TailwindProvider>
  )
}

export default EditProfile