import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'

const ProfileBio = ({desc}) => {
  return (
    <TailwindProvider>
      <View className="bg-white h-32 border-2 mt-4 w-72 rounded-lg">
        <Text className="px-2 py-2">{desc === '' ? "No bio yet" : desc}</Text>
      </View>
    </TailwindProvider>
  )
}

export default ProfileBio