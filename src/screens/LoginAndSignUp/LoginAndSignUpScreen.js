import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ActivityIndicator, Alert, Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { auth } from "../../../firebase-config";
import ButtonCustom from "../../components/LoginAndSignUp/ButtonCustom";
import storage from "../../navigation/Storage";
import HomeScreen from "../Home/HomeScreen";


export function LoginAndSignUpScreen() {
    const [loading, setloading] = useState(true);    
    const navigation = useNavigation();

    const checkuser = async() => {
        const valueEmail = await storage.get("email")
        const valuePassword = await storage.get("password")

        if (valuePassword !== null && valueEmail !== null) {
            await auth.signInWithEmailAndPassword(valueEmail, valuePassword)
            .then(() => { 
                navigation.navigate("HomeScreen")
                setTimeout(() => {
                    setloading(false)                    
                }, 400);
            })
        } else {
            setloading(false)
        } 
    }

    checkuser()


    if (loading) {
        return (
            <TailwindProvider>
                <View className="bg-emerald-400" style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator color={'white'} size={40} />
                </View>
            </TailwindProvider>
        )
    }


    return (
        <TailwindProvider>
            <View className="flex-1 items-center bg-emerald-400 relative">
                <View className="mt-28"></View>
                <Image source={require('C:/Users/Michele Ungolo/Desktop/React-Native/myroutine2/src/assets/logo.png')} />
                <Text className="text-3xl mt-10">MyRoutine</Text>
                <ButtonCustom name={"Login"} navigatebutton={"Login"}/>
                <ButtonCustom name={"Register"} navigatebutton={"Register"}/>
            </View>
        </TailwindProvider>
    );
}