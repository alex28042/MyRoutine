import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'

const ExerciseTableView = () => {
  return (
    <TailwindProvider>
        <View className="bg-white h-14 py-3 mt-4 w-72 rounded-t-xl border-2 items-center">
            <Text>Name of exercise</Text>
        </View>
        <View className="bg-white h-32 w-72 rounded-b-xl border-2 items-start px-2 py-2">
            <View className="flex flex-row">
                <View className="flex flex-col">
                    <Text className="mr-5 ml-4">Sets</Text>                
                    <Text className="mr-4 ml-4 self-center">x</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="mr-5 ml-4">Reps</Text>                
                    <Text className="mr-4 ml-4 self-center">x</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="mr-5 ml-4">Weight</Text>                
                    <Text className="mr-4 ml-4 self-center">x</Text>
                </View>
                <View className="flex flex-col">
                    <Text className="mr-5 ml-4 self-center">RIR</Text>                
                    <Text className="mr-4 ml-4 self-center">x</Text>
                </View>
            </View>
            <View className="flex flex-row mt-7">
                <Text className="mr-1 ml-2 mt-1">Rest</Text>
                <Text  className="mr-1 ml-2 self-center mt-1">x</Text>
            </View>
        </View>
    </TailwindProvider>
  )
}

export default ExerciseTableView