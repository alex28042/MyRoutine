import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CardRoutines = () => {
    const navigation = useNavigation();

  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("RoutineSelectDay")} className="bg-white items-start h-18 w-3/4 mt-4 rounded-xl border-2">
            <Text className="mt-2 ml-2 text-lg">Routine name</Text>
            <Text className="mt-4 ml-2 mb-3">x Training days</Text>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default CardRoutines