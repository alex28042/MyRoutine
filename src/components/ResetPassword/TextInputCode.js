import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TextInput } from 'react-native'

const TextInputCode = () => {
  return (
    <TailwindProvider>
        <TextInput className="bg-white mb-24 ml-3 mr-3 h-16 w-16 border-2 px-7 rounded-full">
        </TextInput>
    </TailwindProvider>
  )
}

export default TextInputCode