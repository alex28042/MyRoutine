import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import ButtonSave from '../../../components/Lenguage/ButtonSave'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import storage from '../../../navigation/Storage'
import { auth } from '../../../../firebase-config'

const ChangePassword = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [newPasswordComfirm, setnewPasswordComfirm] = useState('')
  const [email, setEmail] = useState('')
  const [passwordInStorage, setPasswordInStorage] = useState('')
  const [errorValid, setErrorValid] = useState(false)

  const validInputs = async() => {
    setPasswordInStorage(await storage.get("password"))
    setEmail(await storage.get("email"))

    if (oldPassword == passwordInStorage && newPassword == newPasswordComfirm && oldPassword != '' && newPassword != '' && newPasswordComfirm != '') {
      auth.signInWithEmailAndPassword(email, passwordInStorage).then(function(userCredential) {
        userCredential.user.updatePassword(newPasswordComfirm)
      })

      navigation.navigate("SettingsScreen")
    } else setErrorValid(true)
  }

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <Text className="mt-44 text-xl">
            Change your password   
          </Text>
          <TextInput onChangeText={text => setOldPassword(text)} placeholder='Old password' className="bg-white mt-10 h-14 w-3/4 rounded-full border-2 px-3" />
          <TextInput onChangeText={text => setnewPassword(text)} placeholder='New password' className="bg-white mt-10 h-14 w-3/4 rounded-full border-2 px-3" />
          <TextInput onChangeText={text => setnewPasswordComfirm(text)} placeholder='Confirm new password' className="bg-white mt-10 h-14 w-3/4 rounded-full border-2 px-3" />
          <TouchableOpacity onPress={() => navigation.navigate("ResetPasswordScreen")}>
            <Text className="underline mt-10">Forgotten password</Text>
          </TouchableOpacity>
          {errorValid == true ? 
            <>
              <Text className="mt-5 text-red-600">Error, old password is not right / passwords are not same !</Text>
            </> 
            :  
            <>
            
            </>
          }
          <View className="flex-1 items-center justify-end mb-14 mt-14">
            <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => validInputs()}>
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
    </TailwindProvider>
  )
}

export default ChangePassword