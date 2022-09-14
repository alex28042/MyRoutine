import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native/dist/provider'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import ButtonContinue from '../../components/Login/ButtonContinue'
import { useState } from 'react'
import { ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import storage from "../../navigation/Storage";
import { useEffect } from 'react'
import { db } from '../../../firebase-config'


const CreateRoutineExercisesDay = ({route}) => {
  const [inputs, setInputs] = useState([{Name: '',Sets: '', Reps: '', Weight: '', RIR: '', Rest: ''}])
  const {numberDays, countDays, nameDays, nameRoutine} = route.params
  const [email, setEmail] = useState('')
  const getUser = async() => setEmail(await storage.get("email"))
  const navigation = useNavigation();

  console.log(inputs)
  getUser()

  const addToDataBase = () => {
    for (let i = 0; i < inputs.length; i++) {
      db.collection("Routines/").add({
        Name: inputs[i].Name,
        RIR:inputs[i].RIR,
        Reps:inputs[i].Reps,
        Rest:inputs[i].Rest,
        Sets:inputs[i].Sets,
        Weight:inputs[i].Weight,
        key:inputs[i].key,
        nameDay:inputs[i].nameDay,
        nameRoutine:inputs[i].nameRoutine,
        trainDay:inputs[i].trainDay,
        trainerCreator:inputs[i].trainerCreator,
      })
    }
    setInputs([{Name: '',Sets: '', Reps: '', Weight: '', RIR: '', Rest: ''}])
  }

  const addHandler = ()=>{
    const _inputs = [...inputs];
    _inputs.push({Name: '',Sets: '', Reps: '', Weight: '', RIR: '', Rest: ''});
    setInputs(_inputs);
  }
  
  const deleteHandler = (key)=>{
    const _inputs = inputs.filter((input,index) => index != key);
    setInputs(_inputs);
  }

  const handleChange = (text, key, element)=>{
    const _inputs = [...inputs];
    switch (element) {
      case 1:
        _inputs[key].Name = text;
        break;
      case 2:
        _inputs[key].Sets = text;
        break;
      case 3:
        _inputs[key].Reps = text;
        break;
      case 4:
        _inputs[key].Weight = text;
        break;
      case 5:
        _inputs[key].RIR = text;
        break;
      case 6:
        _inputs[key].Rest = text;
        break;
    }
    _inputs[key].key = key;
    _inputs[key].nameRoutine = nameRoutine
    _inputs[key].trainDay = countDays
    _inputs[key].nameDay = nameDays[countDays - 1]
    _inputs[key].trainerCreator = email
    setInputs(_inputs);
  }

  const continueButton1 = () => {
    addToDataBase()
    navigation.navigate("CreateRoutineExercisesDay", {numberDays: numberDays, countDays: countDays + 1, nameDays: nameDays, nameRoutine: nameRoutine})
  }

  const continueButton2 = () => {
    addToDataBase()
    navigation.navigate("CreateRoutineNotes", {userCreator: email, nameRoutine: nameRoutine})
  }

  return (
    <TailwindProvider>
      <ScrollView className="bg-emerald-400">
        <View className="flex-1 items-center bottom-0 w-full bg-emerald-400">
          <Text className="mt-10 text-xl">{nameDays[countDays - 1]} Day</Text>
          <TouchableOpacity onPress={addHandler} className="bg-white h-16 w-16 justify-center mt-10 border-2 rounded-full items-center">
            <Ionicons name='add' size={50}/>
          </TouchableOpacity>
          {inputs.map((input, key) => (
            <>
              <View className="bg-white h-14 py-3 mt-4 w-72 rounded-t-xl border-2 items-center">
                <TextInput defaultValue={""} onChangeText={(text) => handleChange(text, key, 1)} placeholder='Write name exercise'/>
              </View>
              <View className="bg-white h-32 w-72 rounded-b-xl border-2 items-start px-2 py-2">
                <View className="flex flex-row">
                  <Text className="mr-5 ml-4">Sets</Text>
                  <Text className="mr-4 ml-4">Reps</Text>
                  <Text className="mr-4 ml-4">Weight</Text>
                  <Text className="mr-4 ml-4">RIR</Text>
                </View>
                <View className="flex flex-row">
                  <TextInput keyboardType='numeric' defaultValue={""} onChangeText={(text) => handleChange(text, key, 2)} placeholder='Write' className="mr-4 ml-4"></TextInput>
                  <TextInput keyboardType='numeric' defaultValue={""}  onChangeText={(text) => handleChange(text, key, 3)} placeholder='Write' className="mr-4 ml-4"></TextInput>
                  <TextInput keyboardType='numeric' defaultValue={""}  onChangeText={(text) => handleChange(text, key, 4)} placeholder='Write' className="mr-4 ml-4"></TextInput>
                  <TextInput keyboardType='numeric' defaultValue={""} onChangeText={(text) => handleChange(text, key, 5)} placeholder='Write' className="mr-4 ml-4"></TextInput>
                </View>
                <View className="flex flex-row mt-7">
                  <Text className="mr-1 ml-2 mt-1">Rest</Text>
                  <TextInput defaultValue={""}  onChangeText={(text) => handleChange(text, key, 6)} placeholder='Write' className="mr-1 ml-2"></TextInput>
                  <TouchableOpacity onPress={() => deleteHandler(key)} className="bg-red-600 border-2 ml-24 rounded-full w-20 items-center py-1">
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>          
            </>
          ))}
          <View className="flex-1 items-center justify-end mb-14 mt-14">
            <TouchableOpacity onPress={() => numberDays != countDays ? continueButton1() : continueButton2() } className="bg-white border-2 items-center justify-center w-24 h-10 rounded-full absolute bottom-0">
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </TailwindProvider>
  )
}

export default CreateRoutineExercisesDay