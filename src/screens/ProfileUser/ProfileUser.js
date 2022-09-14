import { View, Text, Image, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'
import SubcribeButton from '../../components/ProfileUser/SubcribeButton'
import CardRoutines from '../../components/ProfileUser/CardRoutines'
import { useState } from 'react'
import { db, firebase, st } from '../../../firebase-config'
import storage from '../../navigation/Storage'
import { useNavigation } from '@react-navigation/native'


const ProfileUser = ({ route }) => {
  const { userObject } = route.params
  const [userData, setUserData] = useState(null)
  const [profilePhotourl, setProfilePhotourl] = useState('null')
  const [routinesName, setRoutinesName] = useState([])
  const [routineData, setRoutineData] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [uid, setuid] = useState(null)
  const [subcribed, setsubcribed] = useState(false);
  const getEmailUser = async() => setEmail(await storage.get("email"))
  const [loading, setloading] = useState(true)
  const navigation = useNavigation() 
  getEmailUser()


  const getNameUser = () => {
    db.collection("Users/").where('email', '==', email).get().then(q => {
      q.forEach(d => {
        const data = d.data()
        setName(data.name)
      })
    })
  }

  const subscribeToProfile = () => {
    const date = new Date()
    db.collection("Subs/").add({
      subcriptor: email,
      subcriptorName: name,
      trainer: userObject.emailuser,
      trainerName: userData.name,
      createdYear: date.getFullYear(),
      createdMonth: date.getMonth(),
      createdDay: date.getDay(),
      expirationYear: date.getMonth() + 1 == 13 ? date.getFullYear() + 1 : date.getFullYear(),
      expirationMonth: date.getMonth() + 1 == 13 ? 1 : date.getMonth() + 1,
      expirationDay: date.getDay()
    })
    db.doc("Users/" + uid).update({
      subcriptions: userData ? userData.subcriptions + 1 : userData.subcriptions,
      moneySubcriptions: userData ? userData.moneySubcriptions + 7.99/2 : userData.moneySubcriptions
    })
    db.collection("Notifications/").add({
      uidTo: userData.email,
      description: "se ha suscrito a tu perfil",
      uidFrom: email,
      nameUserFrom: userData.name
    })
  }

  const func = async() => {
    if (profilePhotourl === 'null') {
      await st.ref(userData ? userData.profilePhoto : '').getDownloadURL().then((x) => {
        setProfilePhotourl(x)
      })
    }
  }

  const getUser = async() => {
    if (userData == null) {
       await db.collection("Users/").where('email', '==', userObject.emailuser).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          setUserData(data)
          setuid(d.id)
        })
      })
    }
  }

  const getRoutines = async() => {
    if (routineData == null) {
      await db.collection("Routines/").where('trainerCreator', '==', userObject.emailuser).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!routinesName.includes(data.nameRoutine)) routinesName.push(data.nameRoutine)
          setRoutineData(data)
        })
      })
    }
  }  
  const userIsSubscribedToUser = async() => {
    await db.collection("Subs").where('trainer', '==', userData ? userData.email : '').where('subcriptor','==', email).get().then(q => q.size > 0 ? setsubcribed(true) : setsubcribed(false))
    setTimeout(() => {
      setloading(false)      
    }, 200);
  }


  getRoutines()
  getUser()
  func()
  
  userIsSubscribedToUser()


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
        <View className="flex-1 items-center bg-emerald-400">
          <View className="flex flex-row mt-14">
            <View className="h-24 w-24 rounded-full border-2 mr-2 justify-center items-center bg-white self-start">
              {profilePhotourl !== 'null' ? <Image source={{uri: profilePhotourl}} className="rounded-full h-24 w-24" />  : <Ionicons name='person-outline' size={40} />}
            </View>
            <View className="ml-6">
              <Text className="text-lg mt-4">{userData ? userData.name : ''}</Text>
              <Text className="text-md">{userData ? userData.subcriptions : 0} subscribed to this trainers</Text>
              <TouchableOpacity onPress={() => userData.instagram === '' ? null : Linking.openURL("https://www.instagram.com/" + userData.instagram)} className="bg-white h-10 w-19 justify-center items-start border-2 mt-3 rounded-md">
                <View className="flex flex-row">
                  <Ionicons name='logo-instagram' size={30} style={{paddingLeft: 7, paddingTop: 2}} />
                  <Text className="mt-2 ml-6">Instagram</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View className="bg-white mt-3 border-2 w-3/4 h-24 rounded-lg items-start">
            <Text className="m-2">{userData ? userData.bio : ''}</Text>
          </View>
          {subcribed ?
            <>
              <View className="h-8 w-3/4 mt-5 rounded-lg items-center justify-center bg-white border-2">
                <Text>Subcribed</Text>
              </View>
            </>
          :
            <>
              <TouchableOpacity onPress={() => {subscribeToProfile();navigation.navigate("SubcriptionScreen")}} className="h-8 w-3/4 mt-5 rounded-lg items-center justify-center bg-blue-400 border-2">
                <Text>Subscribe for 7.99$ per month</Text>
              </TouchableOpacity>
            </>
          }
          
          {routinesName.length != 0 ? 
            <>
              {routinesName.map((e) => (
                <>
                  <TouchableOpacity onPress={() => navigation.navigate("RoutineSelectDay", {nameRoutine: e, creatorUser: userObject.emailuser})} key={e} className="bg-white w-3/4 h-20 mt-4 justify-center rounded-lg border-2">
                    <View className="flex flex-row">
                      <Ionicons name='barbell-outline' size={50} style={{marginLeft:19}}/>
                      <Text className="mt-3 text-lg ml-4">{e} routine</Text>
                    </View>
                  </TouchableOpacity>
                </>
              ))}
            </>
          : 
            <Text className="text-lg mt-10">No Routines yet</Text>
          }
        </View>
    </TailwindProvider>
  )
}

export default ProfileUser