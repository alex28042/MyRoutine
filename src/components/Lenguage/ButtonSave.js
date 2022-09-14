import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';

const ButtonSave = () => {
    const navigation = useNavigation();

    return (
      <TailwindProvider>
        <View className="flex-1 justify-end items-center mb-14 mt-14">
          <TouchableOpacity className="bg-white h-10 w-24 border-2 items-center justify-center rounded-full absolute bottom-0" onPress={() => navigation.navigate("SettingsScreen")}>
            <Text>
             Save
            </Text>
          </TouchableOpacity>
        </View>
      </TailwindProvider>
    )
}

export default ButtonSave