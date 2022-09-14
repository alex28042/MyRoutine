import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import TextInputCustom from '../../components/Login/TextInputCustom'
import ButtonContinue from '../../components/Login/ButtonContinue'

const NewPasswordForgotten = () => {
  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="text-4xl margin mt-40 mb-20">Reset Password</Text>
            <TextInputCustom name={"New password"}/>
            <TextInputCustom name={"Repeat new password"}/>
            <ButtonContinue continueTo={"HomeScreen"}/>
        </View>
    </TailwindProvider>
  )
}

export default NewPasswordForgotten