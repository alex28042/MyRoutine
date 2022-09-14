import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'


const CardRoutineHome = () => {
  return (
    <TailwindProvider>
        <View className="bg-white w-72 h-20 mt-4 flex flex-row rounded-lg border-2">
          <Ionicons name='person-outline' size={50} style={{paddingTop: 8, marginLeft:5}}/>
          <Text className="mt-9 ml-2">
            By name
          </Text>
        </View>
    </TailwindProvider>
  )
}

export default CardRoutineHome