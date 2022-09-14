import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'

const RoutinesCardOwnRoutine = () => {
  return (
    <TailwindProvider>
        <View className="bg-white w-72 h-20 mt-4 rounded-lg border-2 flex flex-row">
            <Ionicons name='person-outline' size={50} style={{paddingTop: 8}}/>
            <Text className="mt-9 ml-2">
                By name
            </Text>
        </View>
    </TailwindProvider>
  )
}

export default RoutinesCardOwnRoutine