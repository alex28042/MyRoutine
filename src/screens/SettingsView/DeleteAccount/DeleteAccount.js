import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import ButtonSave from '../../../components/Lenguage/ButtonSave'
import ButtonContinue from '../../../components/Login/ButtonContinue'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { auth, db } from '../../../../firebase-config'
import storage from '../../../navigation/Storage'

const DeleteAccount = () => {
  const navigation = useNavigation();
  const [deleteInput, setDeleteInput] = useState('')
  const [uid, setuid] = useState(null)
  const [error, seterror] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPasswordInStorage] = useState('')
  const [uidRoutines, setuidroutines] = useState([])
  const [uidNotes, setuidNotes] = useState([])
  const [uidSubIn, setuidSubIn] = useState([])



  const validDelete = async() => {
    setPasswordInStorage(await storage.get("password"))
    setEmail(await storage.get("email"))

    if ((deleteInput == 'DELETE' || deleteInput == 'delete') && deleteInput != '') {
      auth.signInWithEmailAndPassword(email, password).then((userCredentials) => userCredentials.user.delete())
      await db.collection("Users/").where('email', '==', email).get().then(q => {
        q.forEach(d => setuid(d.id))
      })
      await db.collection("Routines/").where('trainerCreator', '==', email).get().then(q => {
        q.forEach(d => uidRoutines.push(d.id))
      })
      await db.collection("Notes/").where('trainer', '==', email).get().then(q => {
        q.forEach(d => uidNotes.push(d.id))
      })
      await db.collection("Subs/").where('subcriptor', '==', email).get().then(q => {
        q.forEach(d => uidSubIn.push(d.id))
      })

      for (const i in uidRoutines) db.doc("Routines/" + i).delete()
      for (const i in uidNotes) db.doc("Notes/" + i).delete()
      for (const i in uidSubIn) db.doc("Subs/" + i).delete()

      db.doc("Users/" + uid).delete()
      storage.set("email", null)
      storage.set("password", null)
      navigation.navigate("Login SignUp screen")
    } else seterror(true)
  }

  return (
    <TailwindProvider>
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <Text className="mt-44 text-xl">
            Write “DELETE” to  delete
            your account 
          </Text>
          <TextInput onChangeText={text => setDeleteInput(text)} placeholder='DELETE' className="bg-white mt-10 h-14 w-3/4 rounded-full border-2 px-3" />
          {error ?
            <>
              <Text className="mt-5 text-red-600">Error writing delete</Text>
            </>
          :
            <>
            
            </>
          }
          <View className="flex-1 items-center justify-end mb-14 mt-14">
            <TouchableOpacity className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0" onPress={() => validDelete()}>
              <Text>
              Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </TailwindProvider>
  )
}

export default DeleteAccount