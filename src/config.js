import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_API_KEY,
  authDomain: "starterproj-9b0cd.firebaseapp.com",
  projectId: "starterproj-9b0cd",
  storageBucket: "starterproj-9b0cd.appspot.com",
  messagingSenderId: "145608264645",
  appId: "1:145608264645:web:c3506a3ae50e952ef159ac",
  measurementId: "G-VEC7WLYBSY"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, db, storage }