import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SubcribeButton = () => {
  const navigation = useNavigation();

  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("SubcriptionScreen")} className="h-8 w-3/4 mt-5 rounded-lg items-center justify-center bg-blue-400 border-2">
            <Text>
              Subscribe for 7.99$ per month
            </Text>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default SubcribeButton