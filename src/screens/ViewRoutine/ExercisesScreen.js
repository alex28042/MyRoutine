import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ExerciseTableView from '../../components/ViewRoutine/ExerciseTableView'
import { db } from '../../../firebase-config'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const ExercisesScreen = ({route}) => {
  const {nameDay, nameRoutine, creatorUser} = route.params
  const [exercises, setExercises] = useState([])
  const [exercisesData, setExercisesData] = useState(null)
  const navigation = useNavigation()

  const getExercises = () => {
    if (exercisesData == null) {
      db.collection("Routines/").where('nameDay', '==', nameDay).where('nameRoutine', '==', nameRoutine).where('trainerCreator', '==', creatorUser).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          exercises.push(data)
          setExercisesData(data)
        })
      })
    }
    console.log(exercises)
  }

  getExercises()

  console.log(nameDay)
  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400">
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <Text className="mt-6">The day {nameDay} has {exercises.length} exercises</Text>  
          {exercises.map((e, i) => (
            <>
              <View key={i} className="bg-white h-14 py-3 mt-4 w-72 rounded-t-xl border-2 items-center">
                <Text>{e.Name}</Text>
              </View>
              <View className="bg-white h-32 w-72 rounded-b-xl border-2 items-start px-2 py-2">
                <View className="flex flex-row">
                  <View className="flex flex-col">
                      <Text className="mr-5 ml-4">Sets</Text>                
                      <Text className="mr-4 ml-4 self-center">{e.Sets}</Text>
                  </View>
                  <View className="flex flex-col">
                      <Text className="mr-5 ml-4">Reps</Text>                
                      <Text className="mr-4 ml-4 self-center">{e.Reps}</Text>
                  </View>
                  <View className="flex flex-col">
                      <Text className="mr-5 ml-4">Weight</Text>                
                      <Text className="mr-4 ml-4 self-center">{e.Weight}</Text>
                  </View>
                  <View className="flex flex-col">
                      <Text className="mr-5 ml-4 self-center">RIR</Text>                
                      <Text className="mr-4 ml-4 self-center">{e.RIR}</Text>
                  </View>
                </View>
                <View className="flex flex-row mt-7">
                  <Text className="mr-1 ml-2 mt-1">Rest</Text>
                  <Text  className="mr-1 ml-2 self-center mt-1">{e.Rest}</Text>
                </View>
              </View>
            </>
          ))}
        </View>
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => navigation.navigate("HomeScreen")}>
            <Text>
             Go Home
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default ExercisesScreen