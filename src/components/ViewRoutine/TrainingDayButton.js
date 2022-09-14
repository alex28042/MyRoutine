import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const TrainingDayButton = () => {
  const navigation = useNavigation();
    return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("ExercisesScreen")} className="bg-white h-14 mt-16 items-start justify-center w-3/4 rounded-full border-2">
            <View className="flex flex-row">
                <Text className="ml-4">Name of Day</Text>
                <Ionicons name='chevron-forward-outline' size={20} style={{paddingLeft:166}}/>
            </View>
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default TrainingDayButton