import { View, Text, Touchable, ScrollView, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonHome from '../../components/Home/ButtonHome'
import CardRoutineHome from '../../components/Home/CardRoutineHome'
import RoutinesCardOwnRoutine from '../../components/Routines/RoutinesCardOwnRoutine'
import RoutinesCardSuscribedUser from '../../components/Routines/RoutinesCardSuscribedUser'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { db } from '../../../firebase-config'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const RoutinesScreen = () => {
  const [routineData1, setRoutineData1] = useState(null)
  const [routineData, setRoutineData] = useState(null)
  const [routinesNameRefresh, setRoutinesNameRefresh] = useState([])
  const [TrainersSub, setTrainersSub] = useState(null)
  const [email, setEmail] = useState('')
  const [routinesName, setRoutinesName] = useState([])
  const [routinesNameOtherUser, setRoutinesNameOtherUser] = useState([])
  const [routinesNameOtherUserRefresh, setRoutinesNameOtherUserRefresh] = useState([])
  const [trainersSubId, settrainersSubId] = useState([])
  const [trainersSubIdRefresh, settrainersSubIdRefresh] = useState([])
  const [loading, setloading] = useState(true)
  const navigation = useNavigation()
  const [refresh, setRefresh] = useState(false)
  const getUser = async() => setEmail(await storage.get("email"))
  
  getUser()
  
  const getUsersSubscribein = () => {
    if (TrainersSub == null) {
      db.collection("Subs/").where('subcriptor', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!trainersSubId.includes(data.trainer)) trainersSubId.push(data.trainer)
          setTrainersSub(data)
        })
      })
    }
  }

  getUsersSubscribein();

  const getRoutinesSubs = async() => {
    if (routineData1 == null) {
      for (let i = 0; i < trainersSubId.length; i++) {
        await db.collection("Routines/").where('trainerCreator', '==', trainersSubId[i]).get().then(q => {
          q.forEach(d => {
            const data = d.data()
            console.log(data)
            if (!routinesNameOtherUser.some(routine => routine.nameRoutine === data.nameRoutine) && !routinesNameOtherUser.some(routine => routine.creatorUser === data.trainerCreator)) routinesNameOtherUser.push({nameRoutine: data.nameRoutine, creatorRutine: data.trainerCreator})
            setRoutineData1(data)
          })
        })
      }
    }
  }

  getRoutinesSubs()

  const getRoutines = async() => {
    if (routineData == null) {
      await db.collection("Routines/").where('trainerCreator', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!routinesName.includes(data.nameRoutine)) routinesName.push(data.nameRoutine)
          setRoutineData(data)
        })
      })
      setTimeout(() => {
        setloading(false)        
      }, 300);
    }
  }

  getRoutines()

  const pullMe = () => {
    setRefresh(true)
    console.log(routinesName)

    setTimeout(async() => {
      setRefresh(false)

      await db.collection("Routines/").where('trainerCreator', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!routinesNameRefresh.includes(data.nameRoutine)) routinesNameRefresh.push(data.nameRoutine)
        })
      })
      console.log(routinesNameRefresh)
      if (routinesName.length != routinesNameRefresh.length) setRoutinesName(routinesNameRefresh)
      
      await db.collection("Subs/").where('subcriptor', '==', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!trainersSubIdRefresh.includes(data.trainer)) trainersSubIdRefresh.push(data.trainer)
        })
      })

      if (trainersSubIdRefresh.length != trainersSubId.length) settrainersSubId(trainersSubIdRefresh)

      for (let i = 0; i < trainersSubId.length; i++) {
        await db.collection("Routines/").where('trainerCreator', '==', trainersSubId[i]).get().then(q => {
          q.forEach(d => {
            const data = d.data()
            if (!routinesNameOtherUserRefresh.some(routine => routine.nameRoutine === data.nameRoutine) && !routinesNameOtherUserRefresh.some(routine => routine.creatorUser === data.trainerCreator)) routinesNameOtherUserRefresh.push({nameRoutine: data.nameRoutine, creatorRutine: data.trainerCreator})
          })
        })
      }

      console.log(routinesNameOtherUserRefresh)

      if (routinesNameOtherUser.length != routinesNameOtherUserRefresh.length) setRoutinesNameOtherUser(routinesNameOtherUserRefresh)
    }, 1500)
    console.log(routinesName)
  }


  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400"
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />}
      >
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <ButtonHome name={"Search Routine"}/>
          <Text className="text-xl mt-7">Own routines: </Text>
          {loading ?
            <>
              <ActivityIndicator className="mt-10" size={40} color={'white'}/>
            </>
          :
            <>
              {routinesName.length != 0 ? 
              <>
                {routinesName.map((e) => (
                  <>
                    <TouchableOpacity key={e} className="bg-white w-72 h-20 mt-4 justify-between flex flex-row rounded-lg border-2">
                      <Ionicons name='barbell-outline' size={50} style={{marginLeft:10, alignSelf: 'center'}}/>
                      <Text className="self-center mr-32 text-lg">{e}</Text>
                    </TouchableOpacity>
                  </>
                ))}
              </>
              : 
                <Text className="text-lg mt-10">No Routines yet</Text>
              }
            </>
          }
        <Text className="text-xl mt-7">Other routines: </Text>
        {loading ? 
          <>
            <ActivityIndicator className="mt-10" size={40} color={'white'}/>
          </>
        :  
          <>
            {routinesNameOtherUser.length != 0 ? 
            <>
              {routinesNameOtherUser.map((e) => (
                <>
                  <TouchableOpacity onPress={() => navigation.navigate("RoutineSelectDay", {nameRoutine: e.nameRoutine, creatorUser: e.creatorRutine})} key={e} className="bg-white w-72 h-20 mt-4 items-center justify-between flex flex-row rounded-lg border-2">
                    <Ionicons name='barbell-outline' size={50} style={{marginLeft:19}}/>
                    <Text className="mr-32 text-lg">{e.nameRoutine}</Text>
                  </TouchableOpacity>
                </>
              ))}
            </>
            : 
              <Text className="text-lg mt-10">No Routines subcribed in</Text>
            }        
          </>
        }
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default RoutinesScreen