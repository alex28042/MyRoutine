import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginAndSignUpScreen } from '../screens/LoginAndSignUp/LoginAndSignUpScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import SignUpScreen from '../screens/SignUp/SignUpScreen';
import MakeDescriptionTrainer from '../screens/MakeDescriptionTrainer/MakeDescriptionTrainer';
import UploadProfilePhoto from '../screens/UploadProfilePhoto/UploadProfilePhoto';
import ResetPasswordScreen from '../screens/ResetPassword/ResetPasswordScreen';
import ConfirmResetPassword from '../screens/ResetPassword/ConfirmResetPassword';
import NewPasswordForgotten from '../screens/ResetPassword/NewPasswordForgotten';
import HomeScreen from '../screens/Home/HomeScreen';
import TabNavigation from './TabNavigation';
import CreateRoutineHome from '../screens/CreateRoutine/CreateRoutineHome';
import CreateRoutineNameDays from '../screens/CreateRoutine/CreateRoutineNameDays';
import CreateRoutineExercisesDay from '../screens/CreateRoutine/CreateRoutineExercisesDay';
import CreateRoutineNotes from '../screens/CreateRoutine/CreateRoutineNotes';
import PromotionScreen from '../screens/PromoteRoutine/PromotionScreen';
import ProfileUser from '../screens/ProfileUser/ProfileUser';
import RoutineSelectDay from '../screens/ViewRoutine/RoutineSelectDay';
import NotesViewScreen from '../screens/ViewRoutine/NotesViewScreen';
import ExercisesScreen from '../screens/ViewRoutine/ExercisesScreen';
import SubcriptionScreen from '../screens/Subcription/SubcriptionScreen';
import PaymentScreen from '../screens/Payment/PaymentScreen';
import SettingsScreen from '../screens/SettingsView/SettingsScreen';
import LenguageScreen from '../screens/SettingsView/Lenguage/LenguageScreen';
import EditProfile from '../screens/SettingsView/EditProfile/EditProfile';
import VinculateInstagram from '../screens/SettingsView/VinculateInstagram/VinculateInstagram';
import ChangePassword from '../screens/SettingsView/ChangePassword/ChangePassword';
import DeleteAccount from '../screens/SettingsView/DeleteAccount/DeleteAccount';
import NotificationsScreen from '../screens/SettingsView/Notifications/NotificationsScreen';
import storage from './Storage';
import { useState } from 'react';
import NotificationsScreenProfile from '../screens/Notifications/NotificationsScreen';
import SubScreenListScreen from '../screens/SubcriberOrSubcription/SubScreenListScreen';
import PasswordsScreen from '../screens/SignUp/PasswordsScreen';
import { StripeProvider } from '@stripe/stripe-react-native';


const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [User, SetUser] = useState(null)
  const getUser = async () => {
    let a = await storage.get("email")
    SetUser(a)
  }

  getUser();

  return (
    <NavigationContainer>
      <StripeProvider publishableKey='pk_test_51LiOtxKEbbYpdkJ18XhgKkboyB14CkI4T5kXZUzyBEp44T6pJRFz66N1vIujoGBkFNppOXSQ8oGUIRwl4ZXq4LFN00R0flZlpg'>
        <Stack.Navigator>
          <Stack.Screen name="Login SignUp screen" component={LoginAndSignUpScreen} options={{headerShown: false, headerBackVisible: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="Register" component={SignUpScreen} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="MakeDescriptionTrainer" component={MakeDescriptionTrainer} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="UploadProfilePhoto" component={UploadProfilePhoto} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="ConfirmResetPassword" component={ConfirmResetPassword} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="NewPasswordForgotten" component={NewPasswordForgotten} options={{headerTitle:"", headerTransparent: true}}/>
          <Stack.Screen name="HomeScreen" component={TabNavigation} options={{headerBackVisible: false, headerShown: false}}/>
          <Stack.Screen name="CreateRoutineHome" component={CreateRoutineHome} />
          <Stack.Screen name="CreateRoutineNameDays" component={CreateRoutineNameDays} />
          <Stack.Screen name="CreateRoutineExercisesDay" component={CreateRoutineExercisesDay} />
          <Stack.Screen name="CreateRoutineNotes" component={CreateRoutineNotes} />
          <Stack.Screen name="PromotionScreen" component={PromotionScreen} />
          <Stack.Screen name="ProfileUser" component={ProfileUser} />
          <Stack.Screen name="RoutineSelectDay" component={RoutineSelectDay} />
          <Stack.Screen name="NotesViewScreen" component={NotesViewScreen} />
          <Stack.Screen name="ExercisesScreen" component={ExercisesScreen} />
          <Stack.Screen name="SubcriptionScreen" component={SubcriptionScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
          <Stack.Screen name="LenguageScreen" component={LenguageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="VinculateInstagram" component={VinculateInstagram} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
          <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} />
          <Stack.Screen name="NotificationsScreenProfile" component={NotificationsScreenProfile} />
          <Stack.Screen name="SubScreenListScreen" component={SubScreenListScreen} />
          <Stack.Screen name="PasswordsScreen" component={PasswordsScreen} />
        </Stack.Navigator>
      </StripeProvider>
    </NavigationContainer>
  ) 
}

export default Navigation