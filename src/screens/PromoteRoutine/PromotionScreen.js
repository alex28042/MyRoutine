import { View, Text, Alert } from 'react-native'
import React from 'react'
import { TailwindProvider } from 'tailwindcss-react-native'
import SelectRoutine from '../../components/Promotion/SelectRoutine'
import { TouchableOpacity } from 'react-native'
import { useState } from 'react'
import storage from '../../navigation/Storage'
import { db } from '../../../firebase-config'
import { CardField, StripeProvider, useConfirmPayment } from '@stripe/stripe-react-native'

const PromotionScreen = () => {
  const [email,setEmail] = useState('')
  const [uid,setUid] = useState(null)
  const [cardDetails, setCardDetails] = useState()
  const {confirmPayment, loading} = useConfirmPayment()
  const API_URL ="http://localhost:3000"

  const getUser = async() => setEmail(await storage.get("email"))
  getUser()

  const updatePromotion = async() => {
    if (uid == null) {
      await db.collection("Users/").where('email', '==', email).get().then(q => {
        q.forEach(d => { 
          setUid(d.id)
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

  const fetchPaymentIntent = async() => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    const {clientSecret, error} = await response.json()
    
    return {clientSecret, error}
  }

  const handlePayPress = async() => {
    if (!cardDetails?.complete || !email) {
      Alert.alert('Please enter Complete Card details')
      return ;
    } 

    const billingDetails = {
      email: email
    }

    try {
      const {clientSecret, error} = await fetchPaymentIntent()

      if (error) {
        console.log("Unable to process payment")
      } else {
        const {paymentIntent, error} = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        })
        if (error) {
          alert(`Payment confirmation error ${error.message}`)
        } else if (paymentIntent) {
          alert("Payment sucess")
          console.log(paymentIntent)
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TailwindProvider>
      <View className="flex-1 items-center bg-emerald-400">
          <Text className="self-center mt-10 text-center text-xl ml-6 mr-6">Engage more people promoting your routines</Text>
          <CardField 
            postalCodeEnabled={false}
            placeholders = {{
              number: "XXXX XXXX XXXX XXXX"
            }}
            onCardChange={cardDetails => {
              setCardDetails(cardDetails)
            }}
            cardStyle={{backgroundColor: "white", borderRadius:20}}
            style={{height: 60, marginVertical:30, width:400}}
          />
          <Text className="self-center mt-52 mb-10 text-center text-xl ml-6 mr-6">
              You will appear in top trainers
              area. The promotion will
              be working until 48 hours
              after purchasing it
          </Text>
          <TouchableOpacity disabled={loading} onPress={() => handlePayPress()} className="bg-white h-16 w-72 rounded-full border-2">
            <Text className="self-center py-4 text-xl">Pay for 2$</Text>
          </TouchableOpacity>       
      </View>
    </TailwindProvider>
  )
}

export default PromotionScreen