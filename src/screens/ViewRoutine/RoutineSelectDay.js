import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import TrainingDayButton from '../../components/ViewRoutine/TrainingDayButton'
import { Ionicons } from '@expo/vector-icons'
import ReadNotesButton from '../../components/ViewRoutine/ReadNotesButton'
import { db } from '../../../firebase-config'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'


const RoutineSelectDay = ({route}) => {
  const {nameRoutine, creatorUser} = route.params;
  const [routineData, setRoutineData] = useState([])
  const [routinecheck, setroutineCheck] = useState(null)
  const [names,setnamesnonrepeat] = useState([])
  const navigation = useNavigation()

  const getRoutine = () => {
    if (routinecheck == null) {
      db.collection("Routines/").where('nameRoutine', '==', nameRoutine).where('trainerCreator', '==', creatorUser).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (names.includes(data.nameDay) !== true) routineData.push(data)
          names.push(data.nameDay)
          setroutineCheck(data)
        })
      })
    }
    routineData.sort((a, b) => a.trainDay - b.trainDay)
    console.log(routineData)
  }

  getRoutine()

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="mt-10 text-2xl">{nameRoutine}</Text>
        <Text className="mt-6 text-lg">Select day of training</Text>
        {routineData.map((e, i) => (
          <>
            <TouchableOpacity key={e.nameDay} onPress={() => navigation.navigate("ExercisesScreen", {nameDay: e.nameDay, nameRoutine: nameRoutine, creatorUser: creatorUser})} className="bg-white h-14 mt-10 justify-between items-center flex flex-row w-3/4 rounded-full border-2">
              <Text className="ml-4">{e.nameDay}</Text>
              <Ionicons name='chevron-forward-outline' size={20} style={{marginRight:20}}/>
            </TouchableOpacity>
          </>
        ))}
        <View className="flex-1 justify-end	w-28 mb-14 mt-14">
          <TouchableOpacity onPress={() => navigation.navigate("NotesViewScreen", {creatorUser: creatorUser, nameRoutine: nameRoutine})} className="bg-white border-2 items-center justify-center rounded-full h-10 w-18">
            <Text>
              Read notes
            </Text>
          </TouchableOpacity>
        </View>      
      </View>
    </TailwindProvider>
  )
}

export default RoutineSelectDay