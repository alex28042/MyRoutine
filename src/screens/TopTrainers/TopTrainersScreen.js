import { View, Text, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import TopTrainersUserCard from '../../components/TopTrainers/TopTrainersUserCard'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { db } from '../../../firebase-config'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'

const TopTrainersScreen = () => {
  const [userData, setUserData] = useState(0)
  const [refresh, setRefresh] = useState(false)
  const [SuggestedTrainersUsers, setSuggestedTrainersUsers] = useState([])
  const [TopTrainersUsers, setTopTrainersUsers] = useState([])
  const [SuggestedTrainersUsersRefresh, setSuggestedTrainersUsersRefresh] = useState([])
  const [TopTrainersUsersRefresh, setTopTrainersUsersRefresh] = useState([])
  const navigation = useNavigation()
  const [loading, setloading] = useState(true)
  
  const getUserPromotion = async() => {
    if (userData == 0) {
      await db.collection("Users/").where('promotion', '==', true).limit(4).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!SuggestedTrainersUsers.some(user => user.emailuser === data.email)) SuggestedTrainersUsers.push({username: data.name, emailuser: data.email  , sub: data.subcriptions})
        })
      })
      await db.collection("Users/").orderBy('subcriptions', 'desc').where('subcriptions', '>', 0).get().then(q => {
        q.forEach(d => {
          const data1 = d.data()
          if (!TopTrainersUsers.some(user => user.emailuser === data1.email)) TopTrainersUsers.push({username: data1.name, emailuser: data1.email, sub: data1.subcriptions})
        })
      })
      setloading(false)
      setUserData(userData + 1)
    }
  }

  getUserPromotion();

  const pullMe = async() => {
    setRefresh(true)

    setTimeout(async() => {
      setRefresh(false)

      await db.collection("Users/").where('promotion', '==', true).limit(4).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (!SuggestedTrainersUsersRefresh.some(x => x.emailuser == data.email)) SuggestedTrainersUsersRefresh.push({username: data.name, emailuser: data.email  , sub: data.subcriptions})
        })
      })
      if (SuggestedTrainersUsers.length != SuggestedTrainersUsersRefresh.length) setSuggestedTrainersUsers(SuggestedTrainersUsersRefresh)

      await db.collection("Users/").orderBy('subcriptions', 'desc').where('subcriptions', '>', 0).get().then(q => {
        q.forEach(d => {
          const data1 = d.data()
          if (!TopTrainersUsersRefresh.some(user => user.emailuser === data1.email)) TopTrainersUsersRefresh.push({username: data1.name, emailuser: data1.email, sub: data1.subcriptions})
        })
      })
      
      if (TopTrainersUsers.length != TopTrainersUsersRefresh.length) setTopTrainersUsers(TopTrainersUsersRefresh)
    }, 1000)
  }

  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400"
        refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()}/>}
      >
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
            <Text className="text-xl mt-7 mb-7">Suggested Trainers</Text>
            {loading ?
              <>
                <View className="mt-10">
                  <ActivityIndicator size={40} color={'white'} />
                </View>
              </>
              :
              <>
                {SuggestedTrainersUsers.map((e, i) => (
                <>
                  <TouchableOpacity key={e} onPress={() => navigation.navigate("ProfileUser", { userObject: e})} className="bg-white w-72 h-20 justify-center mt-2 rounded-lg border-2">
                    <View className="flex flex-row">
                      <Ionicons name='person-outline' size={50} />
                      <View  className="flex flex-col ml-2">
                        <Text className="mt-1">{e.username}</Text>
                        <Text  className="mt-1">{e.sub} following this user</Text> 
                      </View>   
                    </View>
                  </TouchableOpacity>
                </>
                ))}
              </>
            }
            <Text className="text-xl mt-7 mb-4">Top Trainers</Text>
            {loading ?
              <>
                <View className="mt-10">
                  <ActivityIndicator size={40} color={'white'} />
                </View>
              </>
              :
              <>
                {TopTrainersUsers.map((e, i) => (
                <>
                  <TouchableOpacity key={e} onPress={() => navigation.navigate("ProfileUser", { userObject: e})} className="bg-white w-72 h-20 justify-center mt-2 rounded-lg border-2">
                    <View className="flex flex-row">
                      <Ionicons name='person-outline' size={50} />
                      <View  className="flex flex-col ml-2">
                        <Text className="mt-1">{e.username}</Text>
                        <Text  className="mt-1">{e.sub} following this user</Text> 
                      </View>   
                    </View>
                  </TouchableOpacity>
                </>
                ))}
              </>
            }
        </View>   
      </ScrollView>
    </TailwindProvider>
  )
}

export default TopTrainersScreen