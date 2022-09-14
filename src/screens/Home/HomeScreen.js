import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonCustom from '../../components/LoginAndSignUp/ButtonCustom'
import ButtonHome from '../../components/Home/ButtonHome'
import CardRoutineHome from '../../components/Home/CardRoutineHome'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { db } from '../../../firebase-config'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'


const HomeScreen = ({route}) => {
  const [routineData, setRoutineData] = useState(null)
  const [email, setEmail] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [routinesNameRefresh, setRoutinesNameRefresh] = useState([])
  const [uidsRoutines, setUidsRoutines] = useState([])
  const [routinesName, setRoutinesName] = useState([])
  const [loading, setloading] = useState(true)
  const getUser = async() => setEmail(await storage.get("email"))
  const navigation = useNavigation()
  getUser()

  const checkUsersSubscribeIn = () => {
    const [uidsSubs, setUidsSubs] = useState([])
    const date = new Date()
    const dateUseful = new Date(date.getFullYear(), date.getMonth(), date.getDay())

    db.collection("Subs/").where('subcriptor', '==', email).get().then(q => {
      q.forEach(d => {
        const data = d.data()
        const dateExpiration = new Date(data.expirationYear, data.expirationMonth, data.expirationDay)
        if (dateUseful > dateExpiration) uidsSubs.push(d.id)
      })
    })

    if (uidsSubs != []) 
      for (const uid in uidsSubs) db.doc("Subs/" + uid).delete()
  }
  
  checkUsersSubscribeIn()

  const getRoutines = async() => {
    if (routineData == null) {
      await db.collection("Routines/").where('trainerCreator', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!routinesName.includes(data.nameRoutine)) routinesName.push(data.nameRoutine)
          setRoutineData(data)
        })
      })
      setloading(false)
    }
  }

  getRoutines()

  const getRoutineUid = (routine) => {
    db.collection("Routines/").where('trainerCreator', '==', email).where('nameRoutine', '==', routine).get().then(q => {
      q.forEach(d => uidsRoutines.push(d.id))
    })
    console.log(uidsRoutines)
  }

  const deleteNotes = async(routine) => {
    const [uidsNotes, setuidsNotes] = useState(null)
    await db.collection("Notes/").where('trainer', '==', email).where('nameRoutine', '==', routine).get().then(q => {
      q.forEach(d => setuidsNotes(d.id))
    })

    db.doc("Notes/" + uidsNotes).delete()
  }

  const removeName = (index) => {
    console.log(routinesName[index])
    getRoutineUid(routinesName[index])
    for (let i = 0; i < uidsRoutines.length; i++) {
      console.log(uidsRoutines[i])
      db.doc("Routines/" + uidsRoutines[i]).delete()
    }
    deleteNotes(routinesName[index])
    routinesName.splice(index, 1)
    setRoutinesName([...routinesName])
  }

  const pullMe = async () => {
    setRefresh(true)
    console.log(routinesName)

    setTimeout(() => {
      setRefresh(false)
      db.collection("Routines/").where('trainerCreator', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!routinesNameRefresh.includes(data.nameRoutine)) routinesNameRefresh.push(data.nameRoutine)
          setRoutineData(data)
        })
      })

      if (routinesName.length != routinesNameRefresh.length) setRoutinesName(routinesNameRefresh)
    }, 1000)
    
    console.log(routinesName)
  }

  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400" 
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()}/>}
      >
        <View className="flex-1 items-center bg-emerald-400">
          <Text className="text-2xl margin mt-12 mb-5">MyRoutines</Text>
          <ButtonHome name={"Promote Routine"} goTo={"PromotionScreen"} />
          <ButtonHome name={"Create Routine"} goTo={"CreateRoutineHome"}/>
          {loading ? 
          <>
            <View className="mt-10">
              <ActivityIndicator size={40} color={'white'} />
            </View>
          </>
          :
            <>
              
              {routinesName.length != 0 ?
                <>
                {routinesName.map((e, i) => (
                  <>
                    <TouchableOpacity onPress={() => {navigation.navigate("RoutineSelectDay", {nameRoutine: e, creatorUser: email})}}  className="bg-white w-72 h-20 mt-4 justify-between flex flex-row rounded-lg border-2">
                      <Ionicons name='barbell-outline' size={50} style={{alignSelf: 'center', marginLeft:10}}/>
                      <Text key={e} className="self-center">{e}</Text>
                      <Ionicons name='trash-outline' onPress={() => removeName(i)} size={25} style={{alignSelf: 'center', marginRight:10}}/>
                    </TouchableOpacity>
                  </>
                ))}
                </>
              :
                <Text className="mt-10 text-lg">No routines created</Text>
              }
            </>
          }
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default HomeScreen