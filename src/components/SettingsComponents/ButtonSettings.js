import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { auth } from '../../../firebase-config'
import storage from '../../navigation/Storage'


const ButtonSettings = () => {
  const navigation = useNavigation();
  const onHandleLogOut = async () => {
    auth.signOut()
      .then(() => { 
        console.log("Logout")
        storage.remove("email")
        storage.remove("password")
        navigation.navigate("Login SignUp screen")
      })
      .catch((err) => Alert.alert("Login error", err.message));
  };

  return (
    <TailwindProvider>
        <TouchableOpacity onPress={() => navigation.navigate("LenguageScreen")} className="bg-white h-14 flex flex-row w-3/4 justify-between border-2 rounded-xl">
          <Ionicons name='chatbox-outline' size={40} style={{alignSelf: 'center', marginLeft:10}}/>
          <Text className="mt-4 ">Lenguage</Text>
          <Ionicons name='chevron-forward-outline' size={40} style={{alignSelf: 'center'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} className="bg-white h-14 w-3/4 justify-between flex flex-row border-2 rounded-xl">
            <Ionicons name='lock-closed-outline' size={40} style={{marginLeft: 10, alignSelf: 'center'}}/>
            <Text className="mt-4">Change password</Text>
            <Ionicons name='chevron-forward-outline' size={40} style={{marginLeft:14, alignSelf: 'center'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("VinculateInstagram")} className="bg-white h-14 w-3/4 justify-between flex flex-row border-2 rounded-xl">
            <Ionicons name='logo-instagram' size={40} style={{marginLeft: 10, alignSelf: 'center'}}/>
            <Text className="mt-4 ">Vinculate Instagram</Text>
            <Ionicons name='chevron-forward-outline' size={40} style={{marginLeft:0, alignSelf: 'center'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")} className="bg-white h-14 w-3/4 justify-between flex flex-row border-2 rounded-xl">
            <Ionicons name='notifications-outline' size={40} style={{marginLeft: 10, alignSelf: 'center'}}/>
            <Text className="mt-4 ">Notifactions</Text>
            <Ionicons name='chevron-forward-outline' size={40} style={{alignSelf: 'center'}}/>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("DeleteAccount")} className="bg-white h-14 w-3/4 justify-between flex flex-row border-2 rounded-xl">
            <Ionicons name='trash-outline' size={40} style={{marginLeft: 10}}/>
            <Text className="mt-4 ">Delete Account</Text>
            <Ionicons name='chevron-forward-outline' size={40} style={{ alignSelf: 'center'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHandleLogOut} className="bg-white h-14 w-3/4 justify-between flex flex-row border-2 rounded-xl">
            <Ionicons name='log-out-outline' size={40} style={{marginLeft: 10}}/>
            <Text className="mt-4  ">Logout</Text>
            <Ionicons name='chevron-forward-outline' size={40} style={{alignSelf: 'center'}} />
        </TouchableOpacity>
    </TailwindProvider>
  )
}

export default ButtonSettings