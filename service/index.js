import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCwBaufGCOjSueoNQKJuJMjiJnbLwFEW_c",
    authDomain: "evelyn-72e83.firebaseapp.com",
    projectId: "evelyn-72e83",
    storageBucket: "evelyn-72e83.appspot.com",
    messagingSenderId: "606880144920",
    appId: "1:606880144920:web:294bab656e7f23df082d6d",
    measurementId: "G-4YHTF4GGB2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const database = getFirestore()

const auth = getAuth(app)

export  {database, auth}