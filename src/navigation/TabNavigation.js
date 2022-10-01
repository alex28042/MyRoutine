import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/Home/HomeScreen';
import SearchScreen from '../screens/Search/SearchScreen';
import RoutinesScreen from '../screens/Routines/RoutinesScreen';
import TopTrainersScreen from '../screens/TopTrainers/TopTrainersScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarActiveTintColor: 'black'
      })
    }>
      <Tab.Screen name='Home' component={HomeScreen} options={{tabBarIcon: ({focused}) => (focused ? <Ionicons name='home' size={20}/> : <Ionicons name='home-outline' size={20}/>)}} />
      <Tab.Screen name='Search' component={SearchScreen} options={{tabBarIcon: ({focused}) => (focused ? <Ionicons name='search' size={20}/> : <Ionicons name='search-outline' size={20}/>)}}/>
      <Tab.Screen name='Routines' component={RoutinesScreen} options={{tabBarIcon: ({focused}) => (focused ? <Ionicons name='document' size={20}/> : <Ionicons name='document-outline' size={20}/>)}} />
      <Tab.Screen name='Top Trainers' component={TopTrainersScreen} options={{tabBarIcon: ({focused}) => (focused ?   <Ionicons name='podium' size={20}/> : <Ionicons name='podium-outline' size={20}/>)}}/>
      <Tab.Screen name='Profile' component={ProfileScreen} 
        options={{headerRight: () => (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity key={1} style={{marginRight:10}} onPress={() => navigation.navigate("SettingsScreen")} >
              <Ionicons name='settings-outline' size={30} />
            </TouchableOpacity>
            <TouchableOpacity key={2} style={{marginRight:10}} onPress={() => navigation.navigate("NotificationsScreenProfile")} >
              <Ionicons name='notifications-outline' size={30} />
            </TouchableOpacity>
          </View>
        ),
        tabBarIcon: ({focused}) => (focused ? <Ionicons name='person' size={20}/> : <Ionicons name='person-outline' size={20}/> )}}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation