import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import TextInputCustom from '../../components/Login/TextInputCustom'
import ButtonContinue from '../../components/Login/ButtonContinue'

const ResetPasswordScreen = () => {
  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="text-4xl margin mt-36 mb-20">Reset Password</Text>
            <Text className="text-xl margin mt-18 ml-7 mr-7 text-center mb-20">Recieve an email to recover your password</Text>
            <TextInputCustom name={"email"} />
            <ButtonContinue continueTo={"ConfirmResetPassword"}/>
        </View>
    </TailwindProvider>
  )
}

export default ResetPasswordScreen