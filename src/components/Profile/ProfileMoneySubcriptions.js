import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'

const ProfileMoneySubcriptions = ({money}) => {
  return (
    <TailwindProvider>
        <View className="bg-white h-20 w-72 mt-3 rounded-lg border-2 items-center">
            <Text className="py-1 text-lg">Money Earned in subcriptions:</Text>
            <Text className="py-2 text-base">{money} $</Text>
        </View>
    </TailwindProvider>
  )
}

export default ProfileMoneySubcriptions