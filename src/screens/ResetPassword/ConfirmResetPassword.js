import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonContinue from '../../components/Login/ButtonContinue'
import TextInputCode from '../../components/ResetPassword/TextInputCode'

const ConfirmResetPassword = () => {
  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="text-4xl margin mt-36 mb-20">Confirm Code</Text>
            <Text className="text-xl margin mt-18 ml-7 mr-7 text-center mb-20">Introduce the code</Text>
            <View className="items-center flex-row">
                <TextInputCode />
                <TextInputCode />
                <TextInputCode />
                <TextInputCode />
            </View>
            <ButtonContinue continueTo={"NewPasswordForgotten"}/>
        </View>
    </TailwindProvider>
  )
}

export default ConfirmResetPassword