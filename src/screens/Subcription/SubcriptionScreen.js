import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { useNavigation } from '@react-navigation/native'

const SubcriptionScreen = () => {
    const navigation = useNavigation();
  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="text-xl mt-40">Subcribe to nameTrainer
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("PaymentScreen")} className="bg-white w-3/4 items-center mt-96 justify-center h-16 border-2 rounded-full">
                <Text className="text-lg">Subcribe now for 7.99$</Text>
            </TouchableOpacity>
        </View>
    </TailwindProvider>
  )
}

export default SubcriptionScreen