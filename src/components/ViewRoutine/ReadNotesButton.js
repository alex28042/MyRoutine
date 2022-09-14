import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ReadNotesButton = () => {
    const navigation = useNavigation();
    
  return (
    <TailwindProvider>
            <View className="flex-1 justify-end	w-28 mb-14 mt-14">
                <TouchableOpacity onPress={() => navigation.navigate("NotesViewScreen")} className="bg-white border-2 items-center justify-center rounded-full h-10 w-18">
                    <Text>
                        Read notes
                    </Text>
                </TouchableOpacity>
            </View>
    </TailwindProvider>
  )
}

export default ReadNotesButton