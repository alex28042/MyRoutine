import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'


const ButtonHome = ({ name , goTo}) => {
  const navigation = useNavigation();

  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate(goTo)} className="bg-white mt-5 border-2 py-4 w-72 items-center rounded-full">
            <Text className="text-lg">{name}</Text>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default ButtonHome