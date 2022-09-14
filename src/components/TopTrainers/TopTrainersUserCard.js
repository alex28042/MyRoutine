import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'

const TopTrainersUserCard = () => {
  return (
    <TailwindProvider>
        <View className="bg-white w-72 h-20 mt-4 items-start rounded-lg border-2">
          <View className="flex flex-row">
            <Ionicons name='person-outline' size={50} style={{paddingTop:10, marginLeft:4}}/>
            <View className="flex flex-col ml-2">
              <Text className="mt-3">
                By name
              </Text>
              <Text className="mt-3">
                x following this user
              </Text> 
            </View>   
          </View>
        </View>
    </TailwindProvider>
  )
}

export default TopTrainersUserCard