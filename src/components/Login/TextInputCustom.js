import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TextInput } from 'react-native'

const TextInputCustom = ({name, valueTextInput}) => {
  return (
    <TailwindProvider>
        <TextInput placeholder={name} className="bg-white w-64 mb-16 h-14 rounded-full pl-3 border-black border-2">
        </TextInput>
    </TailwindProvider>
  )
}

export default TextInputCustom