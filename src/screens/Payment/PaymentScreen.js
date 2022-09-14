import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const PaymentScreen = () => {
    const navigation = useNavigation();
    return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <TouchableOpacity className="bg-white h-32 mt-24 justify-center items-center w-32 rounded-lg border-2">
                <Ionicons name='card-outline' size={70} />
            </TouchableOpacity>
            <TouchableOpacity className="bg-white mt-40 w-3/4 h-14 rounded-full border-2 items-start justify-center">
                <View className="flex flex-row">
                    <Ionicons name='add' size={35} />
                    <Text className="text-lg self-center">Add Card</Text>
                </View>
            </TouchableOpacity>
            <View className="flex-1 justify-end	w-3/4 mb-14 mt-14">
                <TouchableOpacity className="bg-white items-center justify-center border-2 px-6 py-3 rounded-full inset-x-0 absolute bottom-0" onPress={() => navigation.navigate("HomeScreen")}>
                    <Text>
                        Buy now for 7.99$
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </TailwindProvider>
  )
}

export default PaymentScreen