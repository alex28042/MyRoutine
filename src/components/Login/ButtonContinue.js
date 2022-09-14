import { View, Text, Touchable } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ButtonContinue = ({ continueTo }) => {
  const navigation = useNavigation();


  return (
    <TailwindProvider>
      <View className="flex-1 items-center justify-end mb-14 mt-14">
        <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => navigation.navigate(continueTo)}>
          <Text>
           Continue
          </Text>
        </TouchableOpacity>
      </View>
    </TailwindProvider>
  )
}

export default ButtonContinue