import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'


const SearchTextInput = () => {
  return (
    <TailwindProvider>
         <TextInput placeholder='Search user' className="bg-white w-80 mt-7 h-14 rounded-full px-4 border-2">
          <Ionicons name='search' size={20} />
        </TextInput>
    </TailwindProvider>
   
  )
}

export default SearchTextInput