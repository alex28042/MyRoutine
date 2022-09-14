import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SearchUserCard = () => {
  const navigation = useNavigation();

  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileUser")} className="bg-white w-72 h-18 mt-4 rounded-lg border-2 items-start flex flex-row py-5">
            <Ionicons name='person-outline' size={30} style={{paddingLeft:7}}/>
            <Text className="ml-6 mt-2">
              Name
            </Text>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default SearchUserCard