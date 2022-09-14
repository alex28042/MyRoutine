import { View, Text, TouchableOpacity, RefreshControl } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { ScrollView } from 'react-native'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { db } from '../../../firebase-config'

const NotificationsScreenProfile = () => {
   const [email, setEmail] = useState(null)
   const [refresh, setRefresh] = useState(false)
   const [notificationsData, setnotificationsData] = useState(null)
   const [notifications, setnotifications] = useState([])
   const [notificationsRefresh, setnotificationsRefresh] = useState([])
   const getUser = async() => setEmail(await storage.get("email"))
   getUser()
   
   const getNotifications = () => {
    if (notificationsData == null) {
        db.collection("Notifications/").where('uidTo', '==', email).limit(50).get().then(q => {
            q.forEach(d => {
                const data = d.data()
                if (!notifications.some(u => u.idNot == d.id)) notifications.push({description: data.description, byuser: data.uidFrom, byuserName: data.nameUserFrom,  toUser: data.uidTo, idNot: d.id})
                setnotificationsData(1)
            })
        })
    }
   }

   getNotifications()

   const pullMe = () => {
    setRefresh(true)

    setTimeout(() => {
        setRefresh(false)

        db.collection("Notifications/").where('uidTo', '==', email).limit(50).get().then(q => {
            q.forEach(d => {
                const data = d.data()
                if (!notificationsRefresh.some(u => u.idNot == d.id)) notificationsRefresh.push({description: data.description, byuser: data.uidFrom, byuserName: data.nameUserFrom, toUser: data.uidTo, idNot: d.id})
            })
        })

        if (notifications.length != notificationsRefresh.length) setnotifications(notificationsRefresh)
    }, 1000);
   }

  return (
    <TailwindProvider>
        <ScrollView className="bg-emerald-400"
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()}/>}
        >
            <View className="flex-1 items-center bottom-0 mt-10 w-full bg-emerald-400">
                {notifications.length == 0 ?
                    <Text className="text-lg mt-10">No Notifications</Text>
                :
                
                    notifications.map((e, i) => (
                        <>
                            <TouchableOpacity className="justify-between flex flex-row items-center bg-white rounded-lg border-2 w-3/4 h-14">
                                <Text className="ml-2">{e.byuser}</Text>
                                <Text className="mr-4">{e.description}</Text>
                            </TouchableOpacity>
                        </> 
                    ))                
                }
            </View>
        </ScrollView>
    </TailwindProvider>
  )
}

export default NotificationsScreenProfile