import { View, Text } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { db } from '../../../firebase-config'
import { useState } from 'react'

const NotesViewScreen = ({route}) => {
  const {creatorUser, nameRoutine} = route.params
  const [notes, setNotes] = useState('')
  const [notesData, setNotesData] = useState(null)
  

  const getNotes = () => {
    if (notesData == null) {
      db.collection("Notes/").where('trainer', '==', creatorUser).where('nameRoutine', '==', nameRoutine).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          setNotes(data.notes)
          setNotesData(data)
        })
      })
    }
  }

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
        <Text className="mt-10 text-xl">Read Notes</Text>
        <View className="bg-white h-3/4 w-3/4 mt-7 rounded-lg items-start border-2">
          <Text className="mt-2 ml-4 mb-2 mr-2">{notes == '' ? "no notes yet": notes}</Text>
        </View>
      </View>
    </TailwindProvider>
  )
}

export default NotesViewScreen