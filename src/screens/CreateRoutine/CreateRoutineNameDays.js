import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ButtonContinue from '../../components/Login/ButtonContinue'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import NameDay from '../../components/CreateRoutine/NameDay'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const CreateRoutineNameDays = ({route}) => {
  const {numberDays, nameRoutine} = route.params
  const [InputDay, setInputDay] = useState([])
  const navigation = useNavigation()

  const TextInputDays = () => {
    if (InputDay.length == 0) {
      for (let i = 0; i < numberDays; i++) {
        InputDay.push("")
      }
    }
  }

  TextInputDays()

  const handleChange = (text, index) => InputDay[index] = text

  console.log(InputDay)

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="mt-10 mb-7 text-xl">Write The name of the days</Text>
         {InputDay.map((e, i) => (
          <>
            <TextInput key={e} onChangeText={text => handleChange(text, i)} placeholder='Name of Day' className="bg-white px-2 w-3/4 h-14 rounded-full mt-4 border-2" />
          </>
         ))}
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => navigation.navigate("CreateRoutineExercisesDay", {numberDays: numberDays, countDays: 1, nameDays: InputDay, nameRoutine: nameRoutine})}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default CreateRoutineNameDays