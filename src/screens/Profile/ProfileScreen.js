import { View, Text, Touchable, Linking, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import ProfileBio from '../../components/Profile/ProfileBio'
import ButtonHome from '../../components/Home/ButtonHome'
import ButtonProfile from '../../components/Profile/ButtonProfile'
import ProfileMoneySubcriptions from '../../components/Profile/ProfileMoneySubcriptions'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { auth, db, st } from '../../../firebase-config'
import storage from '../../navigation/Storage'
import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [profilePhotourl, setProfilePhotourl] = useState('null')
  const [uid, setUid] = useState(null)
  const [userData, setUserData] = useState(null)
  const [follows, setFollows] = useState(null)
  const [userDataRefresh, setUserDataRefresh] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [loading, setloading] = useState(true)
  const getUser = async () => setEmail(await storage.get("email"))
  

  const func = async () => {
    if (profilePhotourl === 'null') {
      await st.ref(userData ? userData.profilePhoto : '').getDownloadURL().then((x) => {
        setProfilePhotourl(x)
        setloading(false)
        console.log(x, profilePhotourl)
      })
    }
  }

  const getNameUser = async() => {
    if (userData == null) {
      getUser()
      db.collection('Users').where('email', '==', email).get().then(query => {
        query.forEach(query1 => {
          const data = query1.data()
          setUid(query1.uid)
          setUserData(data)
          console.log(data)
        })
      })
    }
  }

  const getNumberOfFollowTrainers = () => db.collection("Subs/").where('subcriptor', '==', email).get().then(q => setFollows(q.size)  )
  
  getNumberOfFollowTrainers()
  getNameUser();
  func();

  const pullMe = () => {
    setRefresh(true)

    setTimeout(() => {
      setRefresh(false)
      db.collection('Users').where('email', '==', email).get().then(query => {
        query.forEach(q => {
          const data = q.data()
          setUserDataRefresh(data)
        })
      })
      getNumberOfFollowTrainers()
      
      if (userDataRefresh != userData) setUserData(userDataRefresh)
    }, 1000);
  }

  
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
      <ScrollView className="bg-emerald-400"
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()}/>}
      >
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <View className="w-full">
            <View className="bg-white w-24 rounded-full h-24 items-center justify-center border-2 mt-6 self-center">
              {profilePhotourl !== 'null' ? <Image source={{uri: profilePhotourl}} className="rounded-full h-24 w-24" />  : <Ionicons name='person-outline' size={30} />}
            </View>
            <TouchableOpacity onPress={() => userData.instagram === '' ? null : Linking.openURL("https://www.instagram.com/" + userData.instagram)} className="bg-white h-10 w-10 border-2 self-center mt-3 rounded-md">
              <Ionicons name='logo-instagram' size={30} style={{paddingLeft: 3, paddingTop: 2}} />
            </TouchableOpacity>
          </View> 
          <Text className="mt-4 text-lg">{userData ? userData.name : null}</Text>
          <View className="flex flex-row">
            <TouchableOpacity className="items-center ml-2"  onPress={() => navigation.navigate("SubScreenListScreen", {suborFollow: true, user: email})}> 
              <Text className="mt-4 text-lg">{userData ? userData.subcriptions : 0} </Text>
              <Text>Subcriptions</Text>
            </TouchableOpacity>
            <TouchableOpacity className="items-center ml-3" onPress={() => navigation.navigate("SubScreenListScreen", {suborFollow: false, user: email})}> 
              <Text className="mt-4 text-lg">{follows ? follows : 0} </Text>
              <Text>Subscribed to</Text>
            </TouchableOpacity>
          </View>
          <ProfileBio desc={ userData ? userData.bio : "No bio yet"} />
          <ButtonProfile name={"Create Routine"} />
          <ButtonProfile name={"Promote Routine"} />
          <ProfileMoneySubcriptions money={userData ? userData.moneySubcriptions : 0} />
          <View className="mb-10" />
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default ProfileScreen