import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import SelectRoutine from '../../components/Promotion/SelectRoutine'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { db } from '../../../firebase-config'

const PromotionScreen = () => {
  const [email,setEmail] = useState('')
  const [uid,setUid] = useState(null)

  const getUser = async() => setEmail(await storage.get("email"))
  getUser()

  const updatePromotion = async() => {
    if (uid == null) {
      await db.collection("Users/").where('email', '==', email).get().then(q => {
        q.forEach(d => { 
          setUid(d.id())
        })
      })
    }
  }

  updatePromotion();
  
  const updateDb = () => {
    if (uid !== null) {
      db.doc("Users/" + uid).update({
        promotion: true
     })
    }
  }

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bg-emerald-400">
            <Text className="self-center mt-10 text-center text-xl ml-6 mr-6">Engage more people promoting your routines</Text>
            <Text className="self-center mt-52 mb-32 text-center text-xl ml-6 mr-6">
                You will appear in top trainers
                area. The promotion will
                be working until 48 hours
                after purchasing it
            </Text>
            <TouchableOpacity onPress={updateDb()} className="bg-white h-16 w-72 rounded-full border-2">
                <Text className="self-center py-4 text-xl">Promote for 2$</Text>
            </TouchableOpacity>
        </View>
    </TailwindProvider>
  )
}

export default PromotionScreen