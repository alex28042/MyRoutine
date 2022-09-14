import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { useNavigation } from '@react-navigation/native'

const EditProfileButton = () => {
  const navigation = useNavigation();
  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} className="bg-white border-2 items-center mb-4 justify-center rounded-full h-10 w-24">
            <Text>Edit Profile</Text>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default EditProfileButton