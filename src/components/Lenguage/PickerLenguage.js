import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Picker } from '@react-native-picker/picker'

const PickerLenguage = () => {
    const [selectedValue, setSelectedValue] = useState("spanish");


  return (
    <TailwindProvider>
      <View className="mt-10 mb-40"
        style={{
        paddingVertical: 8,
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderRadius: 20,
     }}
     selectedValue={selectedValue}
     onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
     >
        <Picker style={{height: 24, width:300}}>
          <Picker.Item label='Spanish' value={"spanish"} />
          <Picker.Item label='English' value={"English"} />
        </Picker>
      </View>
    </TailwindProvider>
  )
}

export default PickerLenguage