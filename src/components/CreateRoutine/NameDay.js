import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { TextInput } from 'react-native'

const NameDay = () => {
  return (
    <TailwindProvider>
        <TextInput placeholder='Name of the day x' className="mt-10 bg-white border-2 w-72 h-14 rounded-full px-2">
        </TextInput>
    </TailwindProvider>
  )
}

export default NameDay