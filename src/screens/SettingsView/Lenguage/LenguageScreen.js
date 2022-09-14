import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import PickerLenguage from '../../../components/Lenguage/PickerLenguage'
import ButtonSave from '../../../components/Lenguage/ButtonSave'

const LenguageScreen = () => {
  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <Text className="mt-44 text-xl">
            Select lenguage of  
            the app   
          </Text>
          <PickerLenguage />
          <ButtonSave />
        </View>
    </TailwindProvider>
  )
}

export default LenguageScreen