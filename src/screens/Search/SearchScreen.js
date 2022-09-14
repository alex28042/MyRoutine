import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { auth, db, st } from '../../../firebase-config'
import storage from '../../navigation/Storage'


const SearchScreen = () => {
  const navigation = useNavigation()
  const [users, setUsers] = useState([])
  const [usersFiltered, setUsersFiltered] = useState([])
  const [userData, setUserData] = useState(null)
  const [userDataFil, setUserDataFil] = useState(null)
  const [email, setEmail] = useState('')
  const getUser = async () => setEmail(await storage.get("email"))
  const [photopro, setphotopro] = useState(null)
  const [photo, setphoto] = useState(null)


  getUser()

  const getPhoto =  async(dataProfilePhoto) => {
    await st.ref(dataProfilePhoto).getDownloadURL().then((x) => {
      setphoto(x)
    })
  }

  const getAllUsers = async() => {
    if (userData  == null) {
      db.collection("Users/").where('email', '!=', email).get().then(q => {
        q.forEach(d => {
          const data = d.data()
          if (data.profilePhoto != null) getPhoto(data.profilePhoto)
          if (!users.some(u => u.emailuser === data.email)) users.push({username: data.name, emailuser: data.email, photo: data.profilePhoto})
          setUserData(2)
        })
      })
    }
  }

  getAllUsers();

  const searchUser = (textToSearch) => {
    const filtered = users.filter((element, index) => {
      return users.indexOf(element) === index;
    })

    setUsersFiltered(filtered.filter(i => i.username.toLowerCase().includes(textToSearch.toLowerCase())))
  }
  
  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400">
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <TextInput placeholder='Search user' onChangeText={text => {searchUser(text)}} className="bg-white px-3 w-3/4 h-12 mt-5 mb-6 border-2 rounded-full"/>
          {usersFiltered.map((e, i) => (
            <>
              <TouchableOpacity onPress={() => navigation.navigate("ProfileUser", {userObject: e})} className="h-16 bg-white px-2 border-2 w-3/4 rounded-lg justify-center">
                <View className="flex flex-row">
                  {e.photo != null ? <Image source={{uri: e.photo }} className="rounded-full h-10 w-10"/> : <Ionicons name='person-outline' size={40} />}
                  <Text key={i} className="mt-5 ml-2">{e.username}</Text>
                </View>
              </TouchableOpacity>
            </>
          ))}
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default SearchScreen