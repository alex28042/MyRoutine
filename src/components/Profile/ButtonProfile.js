import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'

const ButtonProfile = ({ name }) => {
  return (
    <TailwindProvider>
      <TouchableOpacity className="bg-white mt-4 border-2 py-4 w-64 items-center rounded-full">
        <Text className="text-lg">{name}</Text>
      </TouchableOpacity>
    </TailwindProvider>
  )
}

export default ButtonProfile