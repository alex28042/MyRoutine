import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonSave from '../../../components/Lenguage/ButtonSave'
import { Switch } from 'react-native'
import { useState } from 'react'

const NotificationsScreen = () => {
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isSwitchOn1, setIsSwitchOn1] = useState(false);
    const [isSwitchOn2, setIsSwitchOn2] = useState(false);
    const [isSwitchOn3, setIsSwitchOn3] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
    const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);
    const onToggleSwitch3 = () => setIsSwitchOn3(!isSwitchOn3);

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <View className="bg-white h-14 w-3/4 items-center mt-32 border-2 rounded-xl flex flex-row">
            <Text className="ml-4">Change of routines</Text>
            <Switch 
                className="ml-24"
                value={isSwitchOn} 
                onValueChange={onToggleSwitch}
            />
          </View>
          <View className="bg-white h-14 w-3/4 items-center border-2 rounded-xl flex flex-row">
            <Text className="ml-4">Change of routines</Text>
            <Switch 
                className="ml-24"
                value={isSwitchOn1} 
                onValueChange={onToggleSwitch1}
            />
          </View> 
          <View className="bg-white h-14 w-3/4 items-center  border-2 rounded-xl flex flex-row">
            <Text className="ml-4">Change of routines</Text>
            <Switch 
                className="ml-24"
                value={isSwitchOn2} 
                onValueChange={onToggleSwitch2}
            />
          </View> 
          <View className="bg-white h-14 w-3/4 items-center  border-2 rounded-xl flex flex-row">
            <Text className="ml-4">Change of routines</Text>
            <Switch 
                className="ml-24"
                value={isSwitchOn3} 
                onValueChange={onToggleSwitch3}
            />
          </View>   
          <ButtonSave />
        </View>
    </TailwindProvider>
  )
}

export default NotificationsScreen