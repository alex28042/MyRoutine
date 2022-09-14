import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { ScrollView } from 'react-native'
import { db } from '../../../firebase-config'
import { useState } from 'react'
import { RefreshControl } from 'react-native'

const SubScreenListScreen = ({route}) => {
  const {suborFollow, user} = route.params
  const [follows, setFollows] = useState([]) 
  const [subs, setSubs] = useState([])
  const [followsRefresh, setFollowsRefresh] = useState([]) 
  const [subsRefresh, setSubsRefresh] = useState([])  
  const [followsData, setFollowsData] = useState(null)
  const [refresh, setRefresh] = useState(false) 
  const [subsData, setSubsData] = useState(null) 
  const [loading, setloading] = useState(true)

  const getFollow = async() => {
    if (followsData == null) {
        await db.collection("Subs/").where('subcriptor', '==', user).get().then(q => {
            console.log(q.size)
            q.forEach(d => {
                const data = d.data()
                setFollowsData(data)
                if (!follows.some(f => f.emailuser == data.trainer)) follows.push({emailuser: data.trainer, nameuser: data.trainerName})
            })
        })
        setloading(false)
    }
  }

  const getSubs = async() => {
    if (subsData == null) {
        await db.collection("Subs/").where('trainer', '==', user).get().then(q => {
            q.forEach(d => {
                const data = d.data()
                setSubsData(1) 
                if (!subs.some(u => u.emailuser == data.subcriptor)) subs.push({emailuser: data.subcriptor, nameuser: data.subcriptorName})
            })
        })
    }
  }


  getSubs()
  getFollow()

  const pullMe = () => {
    setRefresh(true)

    setTimeout(async() => {
        setRefresh(false)

        await db.collection("Subs/").where('trainer', '==', user).get().then(q => {
            q.forEach(d => {
                const data = d.data()
                if (!subsRefresh.some(u => u.emailuser == data.subcriptor)) subsRefresh.push({emailuser: data.subcriptor, nameuser: data.subcriptorName})
            })
        })
        await db.collection("Subs/").where('subcriptor', '==', user).get().then(q => {
            console.log(q.size)
            q.forEach(d => {
                const data = d.data()
                if (!followsRefresh.some(f => f.emailuser == data.trainer)) followsRefresh.push({emailuser: data.trainer, nameuser: data.trainerName})
            })
        })

        if (follows.length != followsRefresh.length) setFollows(followsRefresh)
        if (subs.length != subsRefresh.length) setSubs(subsRefresh)

    }, 500)
  }

  console.log(subs.length, follows.length)
  
  return (
    <TailwindProvider>
        <ScrollView className="bg-emerald-400"
            refreshControl={<RefreshControl refreshing={refresh} onRefresh={() => pullMe()}/>}
        >
            <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
                <Text className="mt-10 text-lg mb-10">{suborFollow ? "People who has subscribed you" : "You are following"}</Text>
                {loading ?
                <>
                    <ActivityIndicator color={'white'} size={40} />
                </>    
                :
                <>
                 {suborFollow ?
                    <>
                        {subs.length == 0 ?
                            <Text>No Subs</Text>
                        :
                            <>
                                {subs.map((e, i) => (
                                    <>
                                        <TouchableOpacity className="w-3/4 h-10 border-2 bg-white rounded-lg justify-between items-center flex flex-row">
                                            <Text className="ml-1">{e.nameuser}</Text>
                                        </TouchableOpacity>
                                    </>
                                ))}
                            </>
                        }
                    </>
                :
                    <>
                        {follows.length == 0 ?
                            <Text>No follows</Text>
                        :
                            <>
                                {follows.map((e, i) => (
                                    <>
                                        <TouchableOpacity className="w-3/4 h-10 border-2 bg-white rounded-lg justify-between items-center flex flex-row">
                                            <Text className="ml-1">{e.nameuser}</Text>
                                        </TouchableOpacity>
                                    </>
                                ))}
                            </>
                        }
                    </>
                }
                </>
                }
            </View>
        </ScrollView>
    </TailwindProvider>
  )
}

export default SubScreenListScreen