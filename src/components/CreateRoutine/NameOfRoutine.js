import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TextInput } from 'react-native'
import ButtonContinue from '../Login/ButtonContinue'

const NameOfRoutine = () => {
  return (
    <TailwindProvider>
        <TextInput placeholder='Name of the routine' className="mt-10 bg-white border-2 w-72 h-14 rounded-full px-2">
        </TextInput>
    </TailwindProvider>
  )
}

export default NameOfRoutine