import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Picker } from '@react-native-picker/picker'

const PickerNumDays = () => {
  const [selectedValue, setSelectedValue] = useState(4);
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
        <Picker style={{height: 24, width:100}}>
          <Picker.Item label='1' value={1} />
          <Picker.Item label='2' value={2} />
          <Picker.Item label='3' value={3} />
          <Picker.Item label='4' value={4} />
          <Picker.Item label='5' value={5} />
          <Picker.Item label='6' value={6} />
          <Picker.Item label='7' value={7} />
        </Picker>
      </View>
    </TailwindProvider>
  )
}

export default PickerNumDays