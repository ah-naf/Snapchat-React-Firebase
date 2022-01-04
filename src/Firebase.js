// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {collection, getFirestore} from 'firebase/firestore' 
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpWE6ElexCz28CgHQBNsseMT7WjVXjKLU",
  authDomain: "auth-development-a0eef.firebaseapp.com",
  projectId: "auth-development-a0eef",
  storageBucket: "auth-development-a0eef.appspot.com",
  messagingSenderId: "47288844843",
  appId: "1:47288844843:web:bf8af65e28fbd89fa5206e",
  measurementId: "G-R7WWNLV3WR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)
const db = getFirestore()
const auth = getAuth()
const provider = new GoogleAuthProvider()
const colRef = collection(db, 'snap')

export {colRef, auth, provider, storage, db}
