import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonContinue from '../../components/Login/ButtonContinue'
import CreateNotes from '../../components/CreateRoutine/CreateNotes'
import { useState } from 'react'
import { db } from '../../../firebase-config'
import { useNavigation } from '@react-navigation/native'

const CreateRoutineNotes = ({route}) => {
  const {userCreator, nameRoutine} = route.params
  const [notes, setNotes] = useState('')
  const navigation = useNavigation()

  const addToDataBase = () => {
    db.collection("Notes/").add({
      notes: notes,
      trainer: userCreator,
      nameRoutine: nameRoutine,
    })
    navigation.navigate("HomeScreen", {nameRoutine: nameRoutine})
  }

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <TextInput onChangeText={text => setNotes(text)} placeholder='Write progression overload or about the routine' className="bg-white h-80 w-72 items-center px-2 rounded-xl border-2 mt-16"/>
        <View className="flex-1 items-center justify-end mb-14 mt-14">
          <TouchableOpacity onPress={() => addToDataBase()} className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0">
            <Text>
            Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default CreateRoutineNotes