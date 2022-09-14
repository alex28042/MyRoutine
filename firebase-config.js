import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const config = {
  apiKey: "AIzaSyCk4CcoiTfrplOR1VGM1SFu6-M1An1pCiM",
  authDomain: "myroutine-3d47b.firebaseapp.com",
  projectId: "myroutine-3d47b",
  storageBucket: "myroutine-3d47b.appspot.com",
  messagingSenderId: "1071462550408",
  appId: "1:1071462550408:web:084d21e88e22d9fbf1483d"
};

// Initialize Firebase
firebase.initializeApp(config)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const st = firebase.storage()
export default firebase
