import { View, Text } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storage = {
    set: (key, value) => AsyncStorage.setItem(key, value),
    get: key => AsyncStorage.getItem(key),
    remove: key => AsyncStorage.removeItem(key)
}

export default storage