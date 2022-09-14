import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import NameOfRoutine from '../../components/CreateRoutine/NameOfRoutine'
import ButtonContinue from '../../components/Login/ButtonContinue'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const CreateRoutineHome = () => {
  const [numDays, setNumdays] = useState(null)
  const [NameOfRoutine, setNameofRoutine] = useState('')
  const navigation = useNavigation()
  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <TextInput placeholder='Name of the routine' onChangeText={text => setNameofRoutine(text)} className="mt-24 bg-white border-2 w-72 h-14 rounded-full px-2" />
        <Text className="mt-10 text-xl">Select number of training day per week</Text>
        <TextInput onChangeText={text => setNumdays(text)} keyboardType='numeric' placeholder='num of days (1 - 7)' className="h-14 w-22 mb-10 mt-10 px-2 rounded-2xl bg-white border-2" />
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => navigation.navigate("CreateRoutineNameDays", {numberDays: numDays, nameRoutine: NameOfRoutine})}>
            <Text>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default CreateRoutineHome